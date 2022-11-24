---
title: Capturing doc comments in declarative macros
description: Sometimes it's handy (and generally a good idea!) to capture not only the code itself, but also doc comments.
createdAt: 2022-11-18
updatedAt: 2022-11-18
tags:
  - rust
  - rust-macro
---

Sometimes it's handy (and generally a good idea!) to capture not only the code itself, but also doc comments.

```rust
capture_doc! {
  /// This is the doc comment we want to preserve
  #[derive(Debug)]
  pub enum Node {
    Root,
    Leaf
  }
}
```
