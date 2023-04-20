# vm.codes

Personal website &amp; blog.

## Features

- [x] Built with **[Astro]** and **TypeScript**.
- [x] Uses **Astro [Content Collections][collections]** with **[Zod]** schemas.
- [x] Ships _only ~581 bytes (gzipped)_ of vanilla JavaScript for theme switching.
- [x] Uses **[Tailwind]** for styling.
- [x] Uses good old Markdown with YAML frontmatter for authoring articles.
- [x] Uses **[Shiki]** via **[@nrsk/shikigami]** (with [custom theme][custom-theme]) for syntax highlighting.
- [x] **Dark theme** (respects `prefers-color-scheme`) support.
- [x] **[Open Graph][open-graph]** support.

Also, well, not a feature, but... **100/100 on [yellowlab.tools]** and **all 100s on [pagespeed.web.dev]**.

## Backlog

- [ ] Add dynamic Open Graph image generation.
- [ ] Add article series.
- [ ] _Maybe_ adopt [MDC].

## License

> **The content under the `src/content` directory is [licensed](LICENSE-CONTENT) under the [CC BY 4.0][cc-by-license] license.**

The code is licensed under the [MIT](LICENSE) license.

[astro]: https://astro.build
[tailwind]: https://tailwindcss.com
[shiki]: https://github.com/shikijs/shiki
[custom-theme]: src/syntax/nord.json
[open-graph]: https://ogp.me
[@nrsk/shikigami]: https://github.com/norskeld/shikigami
[mdc]: https://content.nuxtjs.org/guide/writing/mdc
[cc-by-license]: https://choosealicense.com/licenses/cc-by-4.0/
[yellowlab.tools]: https://yellowlab.tools/result/gj0qj4eaxw
[pagespeed.web.dev]: https://pagespeed.web.dev/report?url=https%3A%2F%2Fvm.codes%2F
[collections]: https://docs.astro.build/en/guides/content-collections/
[zod]: https://zod.dev
