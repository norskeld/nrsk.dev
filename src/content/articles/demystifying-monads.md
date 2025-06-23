---
title: 'Demystifying monads'
description: 'Another take on monads, this time without diving into tangled mathematical jargon.'
createdAt: 2021-12-01
updatedAt: 2025-06-23
tags:
  - fp
  - monads
---

Googling _"what a monad is"_ may yield [this answer on StackOverflow], which explains, in exquisitely painful mathematical jargon, what a monad in fact is. But, no worries! Understanding monads doesn't actually require you to learn the nuances of [category theory] or [_F_-algebra]. I rather suggest that the concept of monads can be distilled into a clearer single sentence:

> A monad is a control abstraction that defines the composition of effectful functions.

Sounds way better than the notorious _"A monad is just a monoid in the category of endofunctors"_, if you ask me!

Now, let's unpack.

## Control abstractions

_Control logic_ is the scaffolding around your actual program logic, things like:

- Error propagation
- Iteration
- Stack manipulation
- Virtual dispatch

Here's a simple example in JavaScript:

```javascript
function main() {
  const { isError } = fallible(state)

  if (isError) {
    throw 'Error happened!'
  }

  return process(state)
}
```

That `if (isError)` check is control logic. A _control abstraction_ provides a way to separate a control structure from the interesting code inside it. Common control abstractions are:

- **Exception handling**, for error propagation
- **Objects and interfaces**, for virtual dispatch
- **Function invocation**, for stack manipulation
- **Memory management**

The presence of control abstractions is one of, if not _the_, defining features of high-level languages. Rust, for example, provides destructors, automatic resource management, and smart pointers. Using these control abstractions simplifies control logic and results in less boilerplate needed to execute the code we're actually interested in writing.

## Effectful functions

<!-- An _effect_ is generally anything a function does besides return a value: -->
An _effect_ refers to any phenomenon that arises during program execution beyond just computing a value. Effects introduce additional behavior that affects the program's control flow, state, or interaction with the external world, for instance:

- Returning an error
- Throwing an exception
- Using IO or nondeterministic external state
- Allocating or deallocating resources
- Spawning child processes
- Synchronizing in a multithreaded environment
- Reading or modifying global variables

An effectful function, therefore, is a function that produces or consumes at least one effect. In most languages, any function can be an effectful function, but some languages make effects explicit, e.g. Java has checked exceptions; experimental languages like [Koka] or [Eff] have algebraic effects; OCaml recently introduced [algebraic effects support][ocaml-effects] as well.

## Function composition

Function composition is a way to sequence functions by feeding the output of one function into the input of another one:

```
(f ∘ g)(x) = f(g(x))
```

This works fine for pure functions. But with effects involved, types often no longer line up — especially if `g` returns an effect and `f` doesn't know how to deal with it.

That's where monads come in.

## Monads

A monad defines how to chain effectful functions. It provides two operations, usually called `unit` and `bind`. In Haskell-like syntax:

```haskell
unit :: a -> m a
bind :: (a -> m b) -> (m a -> m b)
```

For those unfamiliar with Haskell syntax, the type `t1 -> t2` is a function type, where `t1` is an argument and `t2` is a return type. And, the construction `m t1` refers to the type `t1` combined with the effect `m`.

`unit` wraps a value in the effect. `bind` chains effectful functions, handling the effects automatically.

### But what is `bind`, exactly?

Monadic bind has several well-known implementations for specific effects. For lists (yes, [list is a monad]), streams, and iterators, `bind` is better known as `flatMap`; and for optionals and promises/futures it is better known as `andThen` or `then`. Often, `bind` implementations in object oriented languages will be defined as instance methods of the class that represents the associated effect.

The `bind` function can be seen in two complementary ways:

- it "unwraps" a value out of the effect and runs that value through a function;
- it transforms a value inside the effect, then _flattens_ the nested effect.

The advantage of the second explanation is that it can be used for monadic effects which resist being modeled as simple data types (like the `State` monad instance).

An important thing to note is that by allowing the composition of effectful functions, `bind` allows the result of an effectful function to depend directly on the result of another effectful function. Haskell's [do notation], the async-await syntax of [Rust], [JavaScript/TypeScript], and [C#], are all examples of `bind` being used to chain effectful expressions one after another.

## Wrapping up

So, now — hopefully — you know what monads are for. Each monad instance defines how to route the control logic for a certain effect in such a way that functions producing that effect can be composed.

But, monads only deal with one effect at a time. How does one compose functions that have more than one effect? How does one compose _effects?_

Consider an iterator. An iterator follows the rules of the list monad, because you can (in principle) collect the elements of an iterator into a list. But what if your iterator doesn't yield values directly, but instead yields a value in an effect?

In most programming languages, there is no way to use regular iteration to perform some effect. Instead, there are separate constructs in libraries for [fallible iterators] and [asynchronous streams]. As more and more effects are added into languages as first-class features, the problem [only gets worse].

Fortunately, there is a way to unify these disparate interfaces and define a way to compose one effect with another... [Monad transformers]!

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
[monad transformers]: https://en.wikibooks.org/wiki/Haskell/Monad_transformers
[koka]: https://koka-lang.github.io
[eff]: https://github.com/eff-lang/eff
[ocaml-effects]: https://ocaml.org/manual/5.3/effects.html
