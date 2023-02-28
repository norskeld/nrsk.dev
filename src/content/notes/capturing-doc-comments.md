---
title: Capturing doc comments in declarative macros
description: How to capture doc comments in Rust macros.
createdAt: 2022-11-18
updatedAt: 2023-02-26
tags:
  - rust
  - macros
---

Sometimes it may be handy to capture not only the code itself, but also doc comments. There's a problem though, because there's no way to capture comment placed outside of a macro. This won't work:

```rust
macro_rules! create (($name:ident, $bytes:expr) => (
  pub struct $name(pub [u8; $bytes]);
));

/// Some really important documentation.
create!(SomeType, 42);
```

Compiler will even warn us:

```ansi
[0;34;1m8[0m [0;34;1m|[0m /// Some really important documentation.
  [0;34;1m| [0;33;1m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^[0m [0;33;1mrustdoc does not generate documentation for macro invocations[0m
  [0;34;1m|[0m
  [0;34;1m= [0;1mhelp[0m: to document an item produced by a macro, the macro must produce the documentation as part of its expansion
  [0;34;1m= [0;1mnote[0m: `#[warn(unused_doc_comments)]` on by default
```

The solution is to move the doc comment into macro body and actually capture it, since doc comment desugars into an attribute on the next token. So the example above can be rewritten as:

```rust
#[doc="Some really important documentation."]
create!(SomeType, 42);
```

And it actually _is_ possible to capture attributes in macros. Many libraries leverage that fact, e.g. [quick_error] or [bitflags]. With that in mind, we can rewrite our macro to capture doc comments.

To match against the attributes, we can use the `meta` metavariable and pass the attribute:

```rust
macro_rules! create {
  ($(#[$attr:meta])* ($name:ident, $bytes:expr)) => {
    $(#[$attr])*
    pub struct $name(pub [u8; $bytes]);
  };
}

create! {
  /// Very important documentation.
  (SomeType, 42)
}
```

Now the `SomeType` struct will have the doc comment we defined in macro body.

<!-- Links. -->

[quick_error]: https://github.com/tailhook/quick-error
[bitflags]: https://github.com/bitflags/bitflags
