# vm.codes

Personal website &amp; blog.

## Features

- [x] Built with **[Astro]** and **TypeScript**.
- [x] Ships _only ~500 bytes (gzipped)_ of vanilla JavaScript for theme switching.
- [x] Uses **[Tailwind]** for styling.
- [x] Uses good old Markdown with YAML frontmatter for authoring articles.
- [x] Uses **[Shiki]** via **[@nrsk/shikigami]** (with [custom theme][custom-theme]) for syntax highlighting.
- [x] **Dark theme** (respects `prefers-color-scheme`) support.
- [x] **[Open Graph][open-graph]** support.

Also, well, not a feature, but... **100/100 on [yellowlab.tools]** and **all 100s on [pagespeed.web.dev]**.

## Acknowledgements

The design and layout are highly inspired by the [Lee Robinson's portfolio][leerob], which is built with [Next.js][next-js], [Tailwind], [Prisma], and has more features. Check the sources [here][leerob-gh]!

## Backlog

- [ ] Add dynamic Open Graph image generation.
- [ ] Add taxonomies (e.g. tags, categories).
- [ ] Add article series.
- [ ] _Maybe_ adopt [MDC].

## License

> **The content under the `content` directory is [licensed](LICENSE-CONTENT) under the [CC BY 4.0][cc-by-license] license.**

The code is licensed under the [MIT](LICENSE) license.

[Astro]: https://astro.build
[Tailwind]: https://tailwindcss.com
[Shiki]: https://github.com/shikijs/shiki
[custom-theme]: src/syntax/norskeld.json
[open-graph]: https://ogp.me
[@nrsk/shikigami]: https://github.com/norskeld/shikigami
[ackee]: https://ackee.electerious.com
[MDC]: https://content.nuxtjs.org/guide/writing/mdc
[cc-by-license]: https://choosealicense.com/licenses/cc-by-4.0/
[leerob]: https://leerob.io
[leerob-gh]: https://github.com/leerob/leerob.io
[next-js]: https://nextjs.org
[prisma]: https://prisma.io
[yellowlab.tools]: https://yellowlab.tools/result/gfay5mlb41
[pagespeed.web.dev]: https://pagespeed.web.dev/report?url=https%3A%2F%2Fvm.codes%2F
