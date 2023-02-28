---
title: Demystifying monads
description: In this article we're going to find out, without diving into tangled mathematical jargon, what monads are and what for we may want to use them.
createdAt: 2021-12-01
updatedAt: 2023-02-26
tags:
  - fp
  - monads
---

Googling _"what a monad is"_ may yield [this answer on StackOverflow], which explains, in exquisitely painful mathematical jargon, what a monad in fact is. But, no worries! Understanding monads doesn't actually require you to learn the nuances of [category theory] or [_F_-algebra]. I rather suggest that the concept of monads can be distilled into a clearer single sentence:

> A monad is a control abstraction that defines the composition of effectful functions.

Sounds way better than the notorious _"A monad is just a monoid in the category of endofunctors"_, if you ask me!

Now, let's unpack.

## Control abstractions

In the practice of computer programming, _control logic_ refers to program code that defines the infrastructure needed to support a particular behavior. Broadly speaking, the control logic is the cruft and boilerplate required to execute the code we're actually interested in writing. Control logic includes such mundane patterns as:

- Error propagation
- Iteration
- Stack manipulation
- Virtual dispatch

A common example of control logic is the classic error propagation routine:

```javascript
function main() {
  const { isError } = fallible(state)

  // This is control logic!
  if (isError) {
    throw 'Error happened!'
  }

  return process(state)
}
```

A _control abstraction_ provides a way to separate a control structure from the interesting code inside it. Common control abstractions are:

- **Exception handling**, for error propagation
- **Objects and interfaces**, for virtual dispatch
- **Function invocation**, for stack manipulation
- **Memory management**

The first two (exceptions and objects) are commonplace in languages that prefer or enforce the object-oriented paradigm. Function invocation is much more fundamental and is present in almost every language, except some of the more limited assembly languages.

The presence of many control abstractions is one of, if not _the_, defining feature of high-level languages. High-level systems languages like Rust provide destructors, automatic resource management, and smart pointers. Using these control abstractions certainly results in less, more interesting code than if the control logic was to be entangled with the more unique parts of the program.

## Effectful functions

The term _effect_ can mean many things in a programming context, but we use it here to mean "anything that results from a function other than its return value." Effects generally include:

- Returning an error
- Throwing an exception
- Using IO or nondeterministic external state
- Allocating or deallocating resources
- Spawning child processes
- Synchronizing in a multithreaded environment
- Reading or modifying global variables

An effectful function, therefore, is a function that produces or consumes at least one effect. In most languages, any function can be an effectful function, but some mainstream languages restrict some effects to specially decorated functions. For example, [Java has checked exceptions] that must be opted into with a function `throws` clause, a widely criticized form of effect.

## Function composition

Function composition is a way to sequence functions by feeding the output of one function into the input of another one. You may actually remember the mathematical definition of function composition from school:

```
(f ∘ g)(x) = f(g(x))
```

Function composition in the functional paradigm allows the programmer to express a sequence of computations — functions — as a single computation that chains each component function one after the other, output-to-input. Ideally, if `f` and `g` produce an effect, then the composition of the two should produce that effect as well. However, plain function composition requires that the result type of `g` match the argument type of `f` exactly. The functions can no longer be composed unless `f` accepts the exact effect!

And this is where monads enter the picture.

## Monads

A monad fundamentally defines how functions are composed in the presence of an associated effect. A monad consists of two operators, often called `unit` and `bind`, and often given in [Haskell syntax] like the following, given a monad `m`.

```haskell
unit :: a -> m a
bind :: (a -> m b) -> (m a -> m b)
```

For those unfamiliar with Haskell syntax, the type `t1 -> t2` is a function type, where `t1` is an argument and `t2` is a return type. And, the construction `m t1` refers to the type `t1` combined with the effect `m`.

The `unit` operator takes a plain value and produces that same value, but within the associated effect. And, importantly, the `bind` operator takes an effectful function and produces an equivalent effectful function _that accepts the associated effect as an argument_. With `bind`, one can compose two effectful functions by `f` and `g` by simply using plain function composition on `bind f` and `g`.

### But what is `bind`, exactly?

Monadic bind has several well-known implementations for specific effects. For lists (yes, [list is a monad]), streams, and iterators, `bind` is better known as `flatMap`; and for optionals and promises/futures it is better known as `andThen` or `then`. Often, `bind` implementations in object oriented languages will be defined as instance methods of the class that represents the associated effect.

The `bind` function can be seen in two complementary ways:

- it "unwraps" a value out of the effect and runs that value through a function;
- it transforms a value inside the effect, then _flattens_ the nested effect.

The advantage of the second explanation is that it can be used for monadic effects which resist being modeled as simple data types (like the `State` monad instance).

An important thing to note is that by allowing the composition of effectful functions, `bind` allows the result of an effectful function to depend directly on the result of another effectful function. Haskell's [do notation], the async-await syntax of [Rust], [JavaScript/TypeScript], and [C#], are all examples of `bind` being used to chain effectful expressions one after another.

## Wrapping up

So, now you know what monads are for. Each monad instance defines how to route the control logic for a certain effect in such a way that functions producing that effect can be composed.

But, monads only deal with one effect at a time. How does one compose functions that have more than one effect? How does one compose _effects?_

Consider an iterator. An iterator follows the rules of the list monad, because you can (in principle) collect the elements of an iterator into a list. But what if your iterator doesn't yield values directly, but instead yields a value in an effect?..

In most programming languages, there is no way to use regular iteration to perform some effect. Instead, there are separate constructs in libraries for [fallible iterators] and [asynchronous streams]. As more and more effects are added into languages as first-class features, the problem [only gets worse].

Fortunately, there is a way to unify these disparate interfaces and define a way to compose one effect with another... Up next time, the _monad transformer_!

<!-- Links. -->

[this answer on stackoverflow]: https://stackoverflow.com/a/3870310
[category theory]: https://en.wikipedia.org/wiki/Category_theory
[_f_-algebra]: https://en.wikipedia.org/wiki/F-algebra
[java has checked exceptions]: https://docs.oracle.com/javase/tutorial/essential/exceptions/catchOrDeclare.html
[haskell syntax]: https://hackage.haskell.org/package/base-4.14.1.0/docs/Control-Monad.html#v:-62--62--61-
[list is a monad]: https://stackoverflow.com/questions/35698485/how-is-list-a-monad
[do notation]: https://wiki.haskell.org/Monad#do-notation
[rust]: https://rust-lang.github.io/async-book/01_getting_started/04_async_await_primer.html
[c#]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/await
[javascript/typescript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[fallible iterators]: https://docs.rs/fallible-iterator/0.2.0/fallible_iterator/
[asynchronous streams]: https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-8#asynchronous-streams
[only gets worse]: https://www.reddit.com/r/rust/comments/g0oekn/fallible_iterator_adapters_blogyoshuawuytscom/fnbuim1
