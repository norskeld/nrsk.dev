---
title: 'Capturing doc comments in declarative macros'
description: "How to: Capture doc comments in Rust's declarative macros."
createdAt: 2022-11-18
updatedAt: 2024-04-09
tags:
  - rust
  - macros
---

Sometimes, when writing declarative macros in Rust, we may want to capture not only the code itself, but also doc comments for that code. Intuitively one could write something like:

```rust
macro_rules! create (($name:ident, $bytes:expr) => (
  pub struct $name(pub [u8; $bytes]);
));

/// Really important comment.
create!(SomeType, 42);
```

Unfortunately, it's not gonna work, and the compiler will promptly warn us:

```ansi title="$ cargo check"
[0;34;1m8[0m [0;34;1m|[0m /// Really important comment.
  [0;34;1m| [0;33;1m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^[0m [0;33;1mrustdoc does not generate documentation for macro invocations[0m
  [0;34;1m|[0m
  [0;34;1m= [0;1mhelp[0m: to document an item produced by a macro, the macro must produce the documentation as part of its expansion
  [0;34;1m= [0;1mnote[0m: `#[warn(unused_doc_comments)]` on by default
```

As rustc suggests, the solution is to move the doc comment into macro body and capture it. This will work because doc comments desugar into [attributes]. So the example above can be rewritten as:

```rust
#[doc="Really important comment."]
create!(SomeType, 42);
```

And, as you may have guessed, it _is_ possible to match against attributes in macros. In fact, many libraries leverage that fact, e.g. [quick_error] or [bitflags]. With that in mind, we can rewrite our macro to capture doc comments.

To match against the attributes, we can use the [`meta` metavariable][meta]:

```rust
macro_rules! create {
  ($(#[$attr:meta])* ($name:ident, $bytes:expr)) => {
    $(#[$attr])*
    pub struct $name(pub [u8; $bytes]);
  };
}

create! {
  /// Really important comment.
  (SomeType, 42)
}
```

Now the `SomeType` struct will have the doc comment we defined in macro body.

<!-- Links. -->

[quick_error]: https://github.com/tailhook/quick-error
[bitflags]: https://github.com/bitflags/bitflags
[attributes]: https://doc.rust-lang.org/reference/attributes.html
[meta]: https://doc.rust-lang.org/reference/macros-by-example.html#metavariables
