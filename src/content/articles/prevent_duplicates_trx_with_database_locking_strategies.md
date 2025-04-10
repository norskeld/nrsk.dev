---
title: Preventing Duplicate Transactions with Database Locking Strategies in Financial Systems
description: Learn how to solve race conditions in financial applications using optimistic and pessimistic locking techniques with a real-world case study of a card issuing system.
createdAt: 2025-04-10
updatedAt: 2025-04-10
tags:
  - database
  - concurrency
  - optimistic-locking
  - financial-systems
  - redis
---

# Introduction

When building financial systems, processing transactions exactly once is critical. Too often, developers overlook the complexities of concurrent processing, leading to duplicate transactions that can have serious consequences. In this article, I'll share how we solved a challenging race condition in a card issuance system using a combination of locking strategies.

# The problem we want to solve

Recently, I was debugging a particularly tricky issue in our card issuing platform. We noticed something alarming in our logs:

```
144609,2025-04-10 16:08:52.637252 +00:00,39407,Pending
144616,2025-04-10 16:09:00.147463 +00:00,39407,Approved
144617,2025-04-10 16:09:00.170468 +00:00,39407,Approved
144618,2025-04-10 16:09:01.356295 +00:00,39407,Approved
```

The same order (ID 39407) was being approved three times within a one-second window! This was happening despite having a Redis-based distributed locking mechanism already in place.

The consequences were severe - each "approval" potentially created a separate physical card, resulting in multiple cards being issued to the same customer. Besides the obvious financial implications, this created a confusing experience for customers who received multiple cards.

The issue occurred when multiple cron job instances would run nearly simultaneously. Each would check if an order was in "Pending" status before approving it, but they'd all read the status before any could write their updates. This classic race condition was happening at the database transaction level, beyond what our Redis job lock could prevent.

# The solution

After analyzing the problem, I realized we needed a multi-layered approach to ensure transaction integrity. Let's walk through the solution step by step.

## Understanding Locking Strategies

There are two primary approaches to handling concurrent database access:

**Pessimistic Locking**
```go
// Original problematic code using pessimistic locking
if err := tx.Clauses(clause.Locking{Strength: "UPDATE"}).
    Preload("CardData").
    First(&order, orderID).Error; err != nil {
    return nil, utility.NewError(err, "FAILED_TO_FETCH_ORDER", "UPDATE-ORDER-STATUS")
}

// Update status
if err := tx.Model(&order).Updates(map[string]interface{}{
    "status":     status,
    "updated_at": time.Now(),
}).Error; err != nil {
    return nil, utility.NewError(err, "FAILED_TO_UPDATE_STATUS", "UPDATE-ORDER-STATUS")
}
```

This approach locks the record during reading, but it doesn't prevent the scenario where multiple processes each select and lock different copies of the same record before updating.

**Optimistic Locking**
```go
// First get the current status
var currentOrder model.CardOrder
if err := tx.Select("status").First(&currentOrder, orderID).Error; err != nil {
    return nil, utility.NewError(err, "FAILED_TO_FETCH_CURRENT_STATUS", "UPDATE-ORDER-STATUS")
}

// Apply optimistic locking: only update if status hasn't changed
result := tx.Model(&model.CardOrder{}).
    Where("id = ? AND status = ?", orderID, currentOrder.Status).
    Updates(map[string]interface{}{
        "status":     status,
        "updated_at": time.Now(),
    })

// Check if update was successful
if result.RowsAffected == 0 {
    return nil, utility.NewError(
        fmt.Errorf("order status was changed by another process"),
        "CONCURRENT_MODIFICATION",
        "UPDATE-ORDER-STATUS",
    )
}
```

This approach doesn't lock anything during read, but ensures updates only succeed if the data hasn't changed since it was read.

## Implementing a Multi-Layered Solution

We implemented three complementary layers to ensure robust protection:

### 1. Database Optimistic Locking

I replaced our repository's `UpdateOrderStatus` method with an optimistic locking version:

```go
func (r *cardOrderRepository) UpdateOrderStatus(
    orderID uint,
    status enums.CardOrderStatus,
) (*model.CardOrder, coerr.Error) {
    result, err := utility.WithTransaction(r.db, func(tx *gorm.DB) (interface{}, error) {
        // 1. First get the current status
        var currentOrder model.CardOrder
        if err := tx.Select("status").First(&currentOrder, orderID).Error; err != nil {
            return nil, utility.NewError(err, "FAILED_TO_FETCH_CURRENT_STATUS", "UPDATE-ORDER-STATUS")
        }
        
        // 2. Only proceed if it's not already the target status (idempotency)
        if currentOrder.Status == status {
            // Status already at target value, load the full order and return
            var order model.CardOrder
            if err := tx.Preload("CardProduct").
                Preload("CardData").
                // More preloads...
                First(&order, orderID).Error; err != nil {
                return nil, utility.NewError(err, "FAILED_TO_RELOAD_ORDER", "UPDATE-ORDER-STATUS")
            }
            return &order, nil
        }
        
        // 3. Apply optimistic locking: only update if status hasn't changed
        result := tx.Model(&model.CardOrder{}).
            Where("id = ? AND status = ?", orderID, currentOrder.Status).
            Updates(map[string]interface{}{
                "status":     status,
                "updated_at": time.Now(),
            })
        
        if result.RowsAffected == 0 {
            return nil, utility.NewError(
                fmt.Errorf("order status was changed by another process"),
                "CONCURRENT_MODIFICATION",
                "UPDATE-ORDER-STATUS",
            )
        }

        // Create status history and reload order...
        return &updatedOrder, nil
    }, "UPDATE_ORDER_STATUS")

    return result.(*model.CardOrder), nil
}
```

This ensures that only one process can successfully transition an order from "Pending" to "Approved" state.

### 2. Per-Order Redis Locking

As an additional safeguard, I added fine-grained Redis locks for each order:

```go
// Add per-order Redis locking to prevent duplicate processing
orderLockKey := fmt.Sprintf("cron:lock:order:%d", order.ID)
orderLockTTL := 30 * time.Second

// Try to acquire order-specific lock
ctx := context.Background()
orderLockAcquired, err := s.redisClient.SetNX(ctx, orderLockKey, "1", orderLockTTL).Result()
if err != nil {
    s.logger.Warn("Failed to acquire Redis lock for order, proceeding with caution", 
        "order_id", order.ID, 
        "error", err)
    // Continue processing - the database optimistic locking is our safety net
} else if !orderLockAcquired {
    s.logger.Info("Order is being processed by another instance, skipping", 
        "order_id", order.ID)
    return nil
}

// Ensure lock release with defer
defer func() {
    if err := s.redisClient.Del(ctx, orderLockKey).Err(); err != nil {
        s.logger.Warn("Failed to release order lock", "order_id", order.ID, "error", err)
    }
}()
```

### 3. Graceful Concurrency Error Handling

Finally, I updated our error handling to gracefully manage concurrency conflicts:

```go
updatedOrder, err := s.orderUsecase.UpdateOrderStatus(order.ID, enums.CardStatusApproved)
if err != nil {
    // Check for concurrent modification error and handle it gracefully
    if cErr, ok := err.(coerr.StringError); ok && cErr.GetErrorCode() == "CONCURRENT_MODIFICATION" {
        s.logger.Info("Order status was modified by another process, skipping", 
            "order_id", order.ID,
            "error", err.Error())
        return nil // Not an error case, just a race condition
    }
    
    return fmt.Errorf("card creation failed for order %d: %v", order.ID, err)
}
```

## The Results

After implementing these changes, our system started handling concurrent processing correctly. Even when multiple cron job instances ran simultaneously, each order was processed exactly once. The logs now showed a clean progression from "Pending" to "Approved" without duplicates.

![Diagram showing transaction flow with locking](https://dev-to-uploads.s3.amazonaws.com/i/o5zj9t6xkvhzpjx83z0w.png)

The multi-layered approach provided several benefits:
1. If Redis failed, the database optimistic locking still prevented duplicates
2. If a cron job crashed, the short TTL on the Redis lock allowed others to take over
3. When concurrent modifications occurred, they were properly logged without raising alarms

# When to Choose Each Locking Strategy

**Use Optimistic Locking When:**
- Conflicts are rare (like our scenario)
- Transactions are short-lived
- You need high throughput
- The system is distributed

**Use Pessimistic Locking When:**
- Conflicts happen frequently
- Transactions are long-running
- The cost of retrying transactions is high
- Data consistency is more important than performance

In our case, optimistic locking was ideal because we had relatively low contention (multiple cron jobs occasionally overlapping) and simple, short transactions.

# References:

- [GORM Transactions Documentation](https://gorm.io/docs/transactions.html)
- [Redis SETNX Command](https://redis.io/commands/setnx/)
- [Martin Fowler on Optimistic Offline Lock](https://martinfowler.com/eaaCatalog/optimisticOfflineLock.html)
- [AWS Database Blog: Optimistic Locking in Databases](https://aws.amazon.com/blogs/database/optimistic-locking-in-amazon-dynamodb/)
