---
title: Slice patterns in Rust
description: A short post on slice patterns in Rust, just to memorize how handy they are.
createdAt: 2022-06-05
updatedAt: 2022-09-01
---

Coming from the front-end world, where I use TypeScript on a daily basis, I find [destructuring assignment][destructuring-assignment], along with [rest] and [spread] syntax for unpacking and expanding arrays and objects, really helpful in writing concise and expressive code.

When I started to learn Rust, I immediately fell in love with its pattern matching feature, because it not only allows you to work with enums in ergonomic and safe manner, but also write really expressive and elegant code. Paired with destructuring and rest syntax, it becomes _extremely_ powerful.

> Note: these patterns work only with **slices** or **arrays**, so you can't, for instance, apply them to plain vectors, since their size is not known at compile-time.

Now, let's see some examples.

## Taking heads & tails off!

### head

Simplest function of the kin for returning the first element of a ~~list~~ slice. Since I wanted it to be generic (to some extent), its signature looks a bit more involved than it could be... Anyway, that's not gonna change the fact, that we destructure the slice to take the `head` and return a copy of it, while ignoring the rest `..` of the slice.

```rust
fn head<T: Clone>(items: &[T]) -> Option<T> {
  match items {
    | [head, ..] => Some(head.to_owned()),
    | _ => None,
  }
}
```

[Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=f7ca004dc2de27ca52fc5cb41d5a57b6) with tests

In TypeScript, we can implement this in a similar, but much less safer fashion, _or_ make use of libraries like [purify-ts]. It provides us with some handy algebraic data structures, e.g. `Maybe<T>`, which in this case is identical to the Rust's `Option<T>`.

```typescript
import { Just, Nothing, type Maybe } from 'purify-ts/Maybe'

function head<T>([head]: Array<T>): Maybe<T> {
  return head ? Just(head) : Nothing
}
```

### tail

What about tails? Pretty much the same story, but with a _binding_ (note that `@` sigil).

Bindings allow us to, well, _bind_ whatever matches the pattern to a variable, and then use it in a [guard predicate][guard], and in the body of the matching branch. In our function we simply bind the rest of the slice to the `tail` variable and then return it, converting to a `Vec<T>`.

```rust
fn tail<T: Clone>(items: &[T]) -> Option<Vec<T>> {
  match items {
    | [_, tail @ ..] => Some(tail.to_vec()),
    | _ => None,
  }
}
```

[Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=9cd6724ede2425db161c79416e7fc7c1) with tests

In TypeScript land, again using [purify-ts]:

```typescript
import { Just, Nothing, type Maybe } from 'purify-ts/Maybe'

function tail<T>([head, ...tail]: Array<T>): Maybe<Array<T>> {
  return head ? Just(tail) : Nothing
}
```

## Rusty tenet

Checking whether a string is palindrome or not, is a very common challenge, so why not solve it?

Again, we make use of _binding_, and match on both the start and end of a slice to create a really elegant solution with recursion.

```rust
fn is_palindrome(chars: &[char]) -> bool {
  match chars {
    | [first, between @ .., last] => first == last && is_palindrome(between),
    | _ => true,
  }
}
```

[Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=006b390a35a50e1fa4f308f98bcac2a2) with tests

Looks neat, if you ask me!

In TypeScript, unfortunately, it gets way more imperative, because TypeScript doesn't allow us to destructure an array as flexible, as Rust does. I admit, this is not the best solution in terms of performance, but it roughly maps to what we have above in Rust.

```typescript
function isPalindrome(chars: Array<string>): boolean {
  if (chars.length < 2) return true

  const first = chars.at(0)
  const last = chars.at(chars.length - 1)
  const between = chars.slice(1, chars.length - 1)

  return first === last && isPalindrome(between)
}
```

## A little trick

There's another handy trick we can use within slice patterns. Turns out, we can not only destructure slices or arrays and bind matches to variables, but also match different variants while doing destructuring!

Let's say, we have some fictional binary format. It has two versions, and each matches to its own sequence of bytes, though they are quite similar. V1 can't be processed, and V2 can.

- If a sequence starts with `0x88` followed by `A` or `B`, then it's V1.
- If a sequence starts with `0x88` followed by `X`, then it's V2.

```rust {{ highlight: [6] }}
#[derive(Debug, PartialEq)]
pub enum Version { V1, V2 }

pub fn parse_header(header: &[u8]) -> Option<(Version, Vec<u8>)> {
  match header {
    | [0x88, b'A' | b'B', contents @ ..] => Some((Version::V1, contents.to_vec())),
    | [0x88, b'X', contents @ ..] => Some((Version::V2, contents.to_vec())),
    | _ => None,
  }
}
```

[Playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=95dba7e869e9499016a9e9a17792b933) with tests

In the first branch we first check if slice starts with `0x88`, and then check for two alternatives: `b'A'` and `b'B'`.

## Conclusion

As you can see, slice patterns aren't overly complex compared to other features in Rust, and they can greatly improve the expressiveness of your code. I really like how fine-grain you can be when defining patterns, and it's one of the functional features — among others, like iterators and immutability by default — that probably outmatches (pun intended) the very same feature in Haskell.

<!-- Links -->

[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
[rest]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
[spread]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
[purify-ts]: https://github.com/gigobyte/purify
[guard]: https://doc.rust-lang.org/rust-by-example/flow_control/match/guard.html
