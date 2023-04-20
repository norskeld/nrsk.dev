---
title: 'Checking for `never`'
description: 'How to: Check for the `never` type in TypeScript.'
createdAt: 2023-01-22
updatedAt: 2023-04-19
tags:
  - typescript
  - types
---

Checking if some type is `never` may seem trivial, and one could write something like:

```typescript
type IsNever<T> = T extends never ? true : false
```

Unfortunately, it's not gonna work as you'd expect:

```typescript
type A = IsNever<never> // never
type B = IsNever<number> // false
type C = IsNever<true> // false
type D = IsNever<any> // boolean
```

Results are not only incorrect, but also strange. This is because union types automatically distribute in conditional types, and—since `never` is basically an empty union—when distribution happens there's nothing to distribute over, so the conditional type simply resolves to `never`.

In order to fix this, you just need to enclose `T` and `never` in a tuple to limit type distribution:

```typescript
type IsNever<T> = [T] extends [never] ? true : false

type A = IsNever<never> // true
type B = IsNever<number> // false
type C = IsNever<true> // false
type D = IsNever<any> // false
```

Voilà!
