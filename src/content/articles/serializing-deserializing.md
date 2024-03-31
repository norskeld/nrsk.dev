---
title: '(De)serializing sets, maps and dates'
description: 'How to: Serialize and deserialize Set, Map, or Date using JSON.stringify and JSON.parse.'
createdAt: 2023-08-30
updatedAt: 2024-03-31
tags:
  - typescript
  - serialization
---

I think we all sometimes need to serialize and deserialize `Set`, `Map` or `Date` objects in JavaScript, but [JSON.stringify] and [JSON.parse] historically don't handle them. Often, it's a good idea to sit down and pick a good serialization library or data interchange format ([MessagePack][messagepack], [Protocol Buffers][protobuf], [Avro][avro]), but sometimes we don't want to bring dependencies for a relatively simple use-case.

For instance, I recently needed to store a relatively small state with `Set` and `Map` objects in `localStorage`. So I decided to write a couple of helper functions that are capable of serializing/deserializing simple `Set`, `Map` and `Date` objects without any dependencies.

In this article I'll show how I did that.

## Representation

Before we start actually serializing and deserializing custom objects, let's first think how we could represent them in plain JSON. The idea I came up with is simple: we encode values as tuples with custom string markers as the first element and our custom representation of the value as the second. Some examples:

```typescript
serialize(new Set([1, 2, 3]))
// => ['@set', [1, 2, 3]]

serialize(new Map([['a', 1], ['b', 2], ['c', 3]]))
// => ['@map', [['a', 1], ['b', 2], ['c', 3]]]

serialize(new Date("2023-08-30"))
// => ['@date', '2023-08-30T00:00:00.000Z']
```

Then, when deserializing, we check if we're looking at a tuple and check if its first element is a marker. If it is, we deserialize it into the object we need. Simple and easy.

Some downsides of this approach:

- It's space inefficient.
- String markers may collide with some arbitrary strings.
- Not all data can be serialized/deserialized this way.

## Adding some types

Now, that we have a representation, let's add some types and structure. For each custom object we want to serialize and deserialize, we will have a "codec" object adhering to `Codec<T, S>` interface that is generic over the input type `T` and the output type `S`.

We'll also need a `Mark` enum for string markers and a generic alias `Serialized<M, S>` for our serialized tuple.

```typescript
const enum Mark {
  Set = '@set',
  Map = '@map',
  Date = '@date'
}

type Serialized<M extends Mark, S = unknown> = [mark: M, value: S]

interface Codec<T, S> {
  serialize: (value: T) => Serialized<Mark, S>
  deserialize: (value: S) => T
}
```

## Serialize

Let's take a look at serialization with [`JSON.stringify`][json.stringify]. It accepts not only an object to convert to a JSON string, but also a `replacer` function as a second parameter that can be used to alter the behavior of the serialization process:

```typescript
JSON.stringify(object, (key, value) => /* ... */)
```

Here the `key` is the property being converted and `value` is a property value, either raw or pre-transformed (i.e. serialized if it implements `toJSON` method).

### `Set`

Armed with this knowledge, let's implement `Set` serialization and actually some part of deserialization. We first define a codec that will contain the actual serialization and deserialization functions:

```typescript
const SetCodec: Codec<Set<unknown>, unknown[]> = {
  serialize: (value) => [Mark.Set, [...value]],
  deserialize: (values) => new Set(values)
}
```

After that let's wrap `JSON.stringify` in a function and pass a replacer function, where we check if the value is a `Set` object and use our `SetCodec` to serialize it:

```typescript
function serialize(value: unknown): string {
  return JSON.stringify(value, (key: string, value: unknown) => {
    if (value instanceof Set) return SetCodec.serialize(value)

    return value
  })
}
```

### `Map`

Essentially the same principle as with `Set`. We first define a codec:

```typescript
const MapCodec: Codec<Map<string, unknown>, [string, unknown][]> = {
  serialize: (value) => [Mark.Map, [...value.entries()]],
  deserialize: (values) => new Map(values)
}
```

And then add a case to the replacer function to actually handle `Map` objects:

```typescript {{ highlight: [4], highlightInvert: true }}
function serialize(value: unknown): string {
  return JSON.stringify(value, (key: string, value: unknown) => {
    if (value instanceof Set) return SetCodec.serialize(value)
    if (value instanceof Map) return MapCodec.serialize(value)

    return value
  })
}
```

### `Date`

At last, let's handle `Date` objects. As we did with `Set` and `Map` we first define a codec:

```typescript
const DateCodec: Codec<Date, string> = {
  serialize: (value) => [Mark.Date, value.toISOString()],
  deserialize: (value) => new Date(value)
}
```

We also need to slightly change the replacer function to be a regular function instead of an arrow function, and check `this[key]` instead of `value` to properly handle `Date` objects:

```typescript {{ highlight: [2, 5], highlightInvert: true }}
function serialize(value: unknown): string {
  return JSON.stringify(value, function (this: any, key: string, value: unknown) {
    if (value instanceof Set) return SetCodec.serialize(value)
    if (value instanceof Map) return MapCodec.serialize(value)
    if (this[key] instanceof Date) return DateCodec.serialize(this[key])

    return value
  })
}
```

Why? Replacer function is called recursively, where:

- `this` is the current node of the object.
- `key` is the property being converted.
- `value` is a pre-transformed property value, being a string when original was a `Date`.

Hence using `this[key]`, which gives us a _raw_ `Date` rather than `value`, which gives us _already serialized_ string.

Also note that to make this code typecheck in strict mode (which implies `noImplicitAny` and `noImplicitThis` to be `true`), you need `this` to be explicitly typed (with `any` in this case). How do you do that in functions? Well, TypeScript since 2.x allows to specify `this` parameter with desired type:

```typescript
function replacer(this: any, key: string, value: unknown) {
  /* ... */
}
```

This only works with `function` declarations though, not arrow functions, because the latter don't have their own `this`. [See the documentation][this-parameter] for additional information.

## Deserialize

Now that we have a working serializer, let's write a deserializer. Similarly to `JSON.stringify`, it accepts a `reviver` function as a second parameter that can be used to alter the behavior of the _deserialization_ process:

```typescript
JSON.parse(serialized, (key, value) => /* ... */)
```

As with `serialize`, we wrap `JSON.parse` in a function, although this time making it generic over the output type `T`, and pass a reviver function:

```typescript
function deserialize<T = unknown>(value: string): T {
  return JSON.parse(value, function (this: any, _: string, value: unknown) {
    return value
  }) as T
}
```

Right now this does nothing with our special tuples. We need somehow to detect them and deserialize. For this we'll need to access the raw value and check if it's marked:

```typescript {{ highlight: [[1, 11], [15, 19]], highlightInvert: true }}
const isSet =
  (value: unknown): value is Serialized<Mark.Set, unknown[]> =>
    Array.isArray(value) && value[0] === Mark.Set

const isMap =
  (value: unknown): value is Serialized<Mark.Map, [string, unknown][]> =>
    Array.isArray(value) && value[0] === Mark.Map

const isDate =
  (value: unknown): value is Serialized<Mark.Date, string> =>
    Array.isArray(value) && value[0] === Mark.Date

function deserialize<T = unknown>(value: string): T {
  return JSON.parse(value, function (this: any, _: string, value: unknown) {
    const raw = this[key] as unknown

    if (isSet(raw)) return SetCodec.deserialize(raw[1])
    if (isMap(raw)) return MapCodec.deserialize(raw[1])
    if (isDate(raw)) return DateCodec.deserialize(raw[1])

    return value
  }) as T
}
```

And that's it! The complete code [can be found here][gist].

<!-- Links. -->

[messagepack]: https://msgpack.org
[protobuf]: https://protobuf.dev
[avro]: https://avro.apache.org

[json.stringify]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#syntax
[json.parse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#syntax
[this-parameter]: https://typescriptlang.org/docs/handbook/2/functions.html#declaring-this-in-a-function
[gist]: https://gist.github.com/norskeld/f59eb5a2ee1bde9b7047a9d4bb1af08a
