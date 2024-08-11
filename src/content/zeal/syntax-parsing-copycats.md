---
draft: true
title: 'Syntax, Parsing, Copycats'
description: 'Zeal Devlog: This post uncovers some of the pitfalls in syntax and parsing I encountered.'
createdAt: 2024-05-31
---

This post uncovers some of the pitfalls in syntax and parsing I encountered.

## Import syntax

One of the first challenges I had to tackle was the import syntax.

```scala
import std.fs.File
import std.fs.read_file
```

Semantically, both `File` and `read_file` are import symbols, but we can't recognize them as such right away, without either:

- performing a full semantic analysis;
- changing syntax to something unambiguous.

One way to work this around is by using forcing conventions, such as enclosing a singular identifier in braces, like `std.fs.{File}` or `std.fs.{read_file}`. This already works, but is not that intuitive.

The other way is to completely detach symbols from the import path, like so:

```elm
import std.fs (File)
import std.fs (read_file)
```

This also works, and is reminiscent of the elm import system, but I'm not sure I like it. Also I'd have to be able to read without skipping whitespace, which is possible, but slightly clunky to my taste.

Another possible solution is to use different delimiters for modules path and symbols, e.g.:

```gleam
import std/fs.File
import std/io/unix.{Socket}
import std/fs.{read_file, File}
```

This is what gleam does, and while it's a bit more verbose that what Rust offers, for instance, it somehow looks just fine, since we have clear distinction between mod path and imported symbols. Also this way we can omit braces/parens when importing a single symbol.
