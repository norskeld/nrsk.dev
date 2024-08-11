---
draft: true
title: 'Introduction'
description: 'Zeal Devlog: Introduction to the Zeal language, some reasons and background behind it.'
createdAt: 2024-05-22
---

This post opens the development log of **Zeal** — a statically-typed programming language embracing **Rust**-inspired single ownership model and GC-less virtual machine.

## Why?

I'm not going to rant here about how all other languages are bad or inherently broken — they are not — at least not all of them — but I definitely accumulated some annoyance and frustration while use most of them. On the other hand, I also accumulated a lot of aspiration to make a language. This is mostly a toy project which I plan to use as an opportunity to revive this blog and learn something new about:

- lower-level stuff like memory management, VMs, syscalls;
- different concurrency models and their inner workings;
- hand rolled lexers and parsers;
- type systems implementation.

## What?

I had a fair amount of exposure to other languages and gradually formed a taste and vague understanding of the language I would like to see emerged. Of course, I first had to get through some uncertainties and teenage obsession with functional programming and languages like **Elm**, **Haskell** and **OCaml**, but in the end I realized — comically? ironically? _shamefully_? — that I would like a mostly imperative language with:

1. a clean and concise syntax that is easy to read and write;
2. a practical and simple type system with single ownership model;
3. a Go/Elixir-like M:N concurrency model;
4. a GC-less bytecode virtual machine.

As you can see, it's somewhat ambitious. At the very least I'd like to implement
