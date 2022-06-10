import markdown from 'markdown-it'

import { language, type Language } from '@/utils/language'

export interface Project {
  name: string
  description: string
  url: string
  language: Language
}

export async function produceProjects(): Promise<Array<Project>> {
  const GH_BASE = 'https://github.com/norskeld'

  return [
    {
      name: 'sigma',
      description:
        'TypeScript [parser combinator](https://en.wikipedia.org/wiki/Parser_combinator) library for building fast and convenient parsers.',
      url: `${GH_BASE}/sigma`,
      language: language('typescript')
    },
    {
      name: 'shikigami',
      description:
        'Opinionated syntax highlighting with [shiki](https://github.com/shikijs/shiki) for [markdown-it](https://github.com/markdown-it/markdown-it).',
      url: `${GH_BASE}/shikigami`,
      language: language('typescript')
    },
    {
      name: 'rsx',
      description: 'Micro CLI for interactive execution of npm & yarn scripts.',
      url: `${GH_BASE}/rsx`,
      language: language('rust')
    },
    {
      name: 'diceware',
      description:
        'Rust crate and CLI for generating [Diceware](https://en.wikipedia.org/wiki/Diceware) passphrases.',
      url: `${GH_BASE}/diceware`,
      language: language('rust')
    }
  ]
}

export async function getProjects(): Promise<Array<Project>> {
  const projects = await produceProjects()

  const parser = markdown('default', {
    typographer: true
  })

  return projects.map((project) => {
    return {
      ...project,
      description: parser.renderInline(project.description)
    }
  })
}
