---
title: Most Effective Design Patterns In Golang
description: A quick review of the useability of design patterns in Golang.
createdAt: 2023-06-25
updatedAt: 2023-06-25
tags:
  - Golang
  - Design-patterns
  - Observer pattern
  - Singleton pattern
  - Factory Pattern
  - Builder Pattern
  - Facade Design
---

# Introduction (still writing it)

In the scope of software development. Design patterns are typical solutions to commonly occurring problems in software design.
They are like pre-made blueprints that you can customize to solve a recurring design problem in your code.

In this article, we will have a quick review of the most effective patterns to be used when coding with Golang.

the most effective ones in my opinion are:

- Observer Pattern
- Singleton Pattern
- Factory Pattern
- Builder Pattern
- Facade Pattern



# Observer Pattern
The Observer pattern is a software design pattern that defines a one-to-many dependency between objects. When one object changes its state, all its dependents are notified and updated automatically.

Why we should use **Observer Pattern**? 

* Loose coupling: The Observer pattern allows us to create a system where a change in one object results in an automatic change in other objects.
* Broadcast communication: When an event happens to an object, all its dependents get notified without needing to know who these dependents are.
* Dynamic relationships: The Observer pattern allows us to add or remove observers dynamically at runtime, offering greater flexibility.
* Event management: It’s excellent for event monitoring and handling situations where action must trigger additional actions.


```go
type Subject interface {
    Register(observer Observer)
    Deregister(observer Observer)
    Notify()
}

type Observer interface {
    Update()
}

```

The above interfaces are the main block to implementing this pattern, the subject interface is responsible for registering or deregistering observers and it is 
responsible for notifying them about changes, and the update method in Observer is called when a notification is sent.


```go

type ConcreteSubject struct {
    Observers []Observer
}

func (cs *ConcreteSubject) Register(observer Observer) {
    cs.Observers = append(cs.Observers, observer)
}

func (cs *ConcreteSubject) Deregister(observer Observer) {
    // Implementation of deregistration
}

func (cs *ConcreteSubject) Notify() {
    for _, observer := range cs.Observers {
        observer.Update()
    }
}

type ConcreteObserver struct {
    ID int
}
// This line is a compile-time check to ensure that the ConcreteSubject struct 
// implements the Subject interface. If ConcreteSubject does not satisfy all the 
// methods declared in Subject, the code will fail to compile. This is useful 
// to catch any inadvertent changes that may cause ConcreteSubject to no longer 
// implement the Subject interface. The variable is discarded (hence the underscore) 
// because we don't need it for anything - we're only interested in the side effect 
// of the type check.

var _ Subject = (*ConcreteSubject)(nil)

func (co *ConcreteObserver) Update() {
    fmt.Println("Observer", co.ID, "updated")
}
```


Real World Example:



Consider you're running a blog and have a list of subscribers who want to be notified whenever a new blog post is published.
In this scenario, the blog is the Subject (or Publisher), and the subscribers are the Observers.

```go

package main

import (
	"fmt"
)

type Subscriber interface {
	Update(string)
}

type Blog struct {
	subscribers []Subscriber
}

func (b *Blog) Subscribe(s Subscriber) {
	b.subscribers = append(b.subscribers, s)
}

func (b *Blog) Publish(post string) {
	for _, subscriber := range b.subscribers {
		subscriber.Update(post)
	}
}

type User struct {
	Name string
}

func (u *User) Update(post string) {
	fmt.Printf("%s received new post: %s\n", u.Name, post)
}

func main() {
	user1 := &User{Name: "Alice"}
	user2 := &User{Name: "Bob"}

	blog := &Blog{}
	blog.Subscribe(user1)
	blog.Subscribe(user2)

	blog.Publish("Introduction to the Observer Pattern in Golang")
}

```

# Singleton Pattern

The Singleton pattern ensures that a class only has one instance and provides a global point of access to it.
This pattern is useful when exactly one object is needed to coordinate actions across the system. Golang, being a language that emphasizes simplicity,
does not support classes. However, we can still implement a Singleton pattern by using package-level variables.

```go
package singleton

import "sync"

type singleton struct {
	value string
}

var (
	instance *singleton
	once     sync.Once
)

func Instance() *singleton {
	once.Do(func() {
		instance = &singleton{value: "I am a singleton!"}
	})

	return instance
}
```
By invoking the Instance() function multiple times, we can observe the Singleton pattern in action - the function will instantiate the singleton once, and subsequent calls will retrieve the already-created instance from memory.


