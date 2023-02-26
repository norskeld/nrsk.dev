---
title: Checking for `never`
description: Tricks for working with `never` type in TypeScript.
createdAt: 2023-01-22
updatedAt: 2023-01-22
tags:
  - typescript
  - types
---

> [Playground] @ TypeScript v4.9.4

Checking if some type is `never` may seem trivial, and one _could_ write something like:

```ts
type IsNever<T> = T extends never ? true : false
```

Unfortunately, it's not gonna work as you'd expect:

```ts
type A = IsNever<never>  // never
type B = IsNever<number> // false
type C = IsNever<true>   // false
type D = IsNever<any>    // boolean
```

Huh? The explanation boils down to the following:

> Union types automatically distribute in conditional types, and, since `never` is basically an empty union, when distribution happens there's nothing to distribute over, so the conditional type simply resolves to `never`.

To make it work, you should enclose `T` and `never` in a tuple to limit type distribution:

```ts
type IsNever<T> = [T] extends [never] ? true : false

type A = IsNever<never>  // true
type B = IsNever<number> // false
type C = IsNever<true>   // false
type D = IsNever<any>    // false
```

<!-- Links. -->

[playground]: https://www.typescriptlang.org/play?#code/C4TwDgpgBAkgzgOQgNwgJwDwBUB8UC8UA2lgLpQQAewEAdgCZzG0rrkD8UwaArtAFxQAZgEMANnAgAoKaEhQAggViJWmFqjR4oAeh1de0udABCy+Ek0ZaPALYAjdHj3Dxk2eGgBhc6qvc+bV19UQkjTygAEV9LdAwRWhAg4NcwqSA
