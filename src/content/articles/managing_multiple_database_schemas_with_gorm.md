---
title: Managing Multiple Database Schemas with Gorm
description: This tutorial will guide you through the process of handling multiple database schemas using Gorm in one connection
createdAt: 2023-07-09
updatedAt: 2023-07-09
tags:
  - golang
  - gorm
  - database
---

# Introduction

Gorm is an exceptional Object-Relational Mapping (ORM) library for Golang, equipped with a wide range of features.

# Identifying the Issue

Although the Gorm documentation is comprehensive, it does not always include all the minor details that a developer might need. I encountered a specific problem where I needed to manage two schemas with one database, as illustrated below. The aim was to maintain a schema of APP and another schema of AUTH within the same database. This separation can be useful for breaking down the application into smaller services or for managing the app database from a different viewpoint.

![image](https://github.com/1saifj/1saifj.me/blob/master/src/assets/images/gorm_schema.drawio.png)

Upon reading the Gorm documentation, I did not find a direct solution to my problem. However, by exploring the Gorm [source code](https://github.com/go-gorm/gorm/blob/master/schema/schema.go#L98), I was able to devise a solution.

# The Solution

To enable Gorm to manage multiple schemas within one database, we can use table naming for each table model we create.

```go
type TablerWithNamer interface {
	TableName(Namer) string
}
```

Here, TableName is an interface used to modify the given name for a table. To employ this function, we need to define a custom struct that implements this interface.

```go

// CustomTabler is a custom struct that implements TablerWithNamer
type CustomTabler struct {
	gorm.Tabler
}
```

```go
// TableName returns the custom table name based on the struct name
func (ct *CustomTabler) TableName() string {
	// Generate and return the custom table name based on your logic
	// Example: return "custom_table_name"
	return "custom_table_name"
}
```
Now let's implement our database schemas as per the diagram above, using a full code example that utilizes Gorm's table renaming, scopes, and clauses.

```go

package main

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

const (
	AppSchema  = "app"
	AuthSchema = "auth"
)

// User is a model representing the user's table
type User struct {
	ID   uint
	Name string
}

// TableName returns the custom table name for the User model
func (User) TableName() string {
	return AuthSchema + ".user"
}

// Order is a model representing the orders table
type Order struct {
	ID     uint
	Name   string
	UserID uint
}

// TableName returns the custom table name for the Order model
func (Order) TableName() string {
	return AppSchema + ".order"
}

// AuthScope is a custom scope for the auth schema
func AuthScope() func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Table("auth.user")
	}
}

// AppScope is a custom scope for the app schema
func AppScope() func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Table("app.order")
	}
}

func main() {
	// Connect to the database
	db, err := gorm.Open(postgres.Open("host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable TimeZone=Asia/Jakarta"), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	// Create schema if not exist
	db.Exec("CREATE SCHEMA IF NOT EXISTS " + AppSchema)
	db.Exec("CREATE SCHEMA IF NOT EXISTS " + AuthSchema)

	// Auto-migrate the models
	err = db.AutoMigrate(&User{}, &Order{})
	if err != nil {
		panic(err)
	}

	// Create a new user in the auth schema
	user := User{Name: "John"}
	db.Scopes(AuthScope()).Create(&user)

	// Create a new order associated with the user in the app schema
	order := Order{Name: "Order 1", UserID: user.ID}
	db.Scopes(AppScope()).Create(&order)

	// Fetch all users from the auth schema
	var authUsers []User
	db.Scopes(AuthScope()).Find(&authUsers)
	fmt.Println("Auth Users:", authUsers)

	// Fetch all orders from the app schema
	var appOrders []Order
	db.Scopes(AppScope()).Find(&appOrders)
	fmt.Println("App Orders:", appOrders)

	// Fetch all orders from the app schema with the associated user
	var appOrdersWithUser []Order
	db.Scopes(AppScope()).Preload(clause.Associations).Find(&appOrdersWithUser)
	fmt.Println("App Orders with User:", appOrdersWithUser)
}
```

We begin by creating our models, such as the user and order models. We then define scope functions to enhance the reusability of database queries. In this example, we utilize these scopes as schema queries. We then establish a database connection and ensure our database includes these schemas, creating them if necessary. clause.Associations is used to specify associations to be preloaded or eager-loaded when querying the database. It allows you to load related associations in a single query to minimize the number of database round-trips and improve performance.

That's it! Thank you for reading this blog, and stay tuned for future posts.
