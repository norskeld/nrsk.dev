import markdown from 'markdown-it'

export type LanguageKind = 'typescript' | 'javascript' | 'haskell' | 'rust'
export type LanguageColor = [light: string, dark: string]

export interface Language {
  kind: LanguageKind
  color: LanguageColor
  name: string
  ext: string
}

export interface Project {
  name: string
  description: string
  language: Language
  url: string
  wip: boolean
}

const languages: Array<Language> = [
  {
    kind: 'typescript',
    name: 'TypeScript',
    ext: '.ts',
    color: ['#3178c6', '#4c83bd']
  },
  {
    kind: 'rust',
    name: 'Rust',
    ext: '.rs',
    color: ['#a9643d', '#dea584']
  },
  {
    kind: 'haskell',
    name: 'Haskell',
    ext: '.hs',
    color: ['#5e5086', '#8576ad']
  }
]

function language(lang: LanguageKind): Language {
  return languages.find(({ kind }) => kind === lang)!
}

async function produceProjects(): Promise<Array<Project>> {
  const GH_BASE = 'https://github.com/norskeld'

  return [
    {
      name: 'sigma',
      description:
        'TypeScript [parser combinator](https://en.wikipedia.org/wiki/Parser_combinator) library for building fast and convenient parsers.',
      url: `${GH_BASE}/sigma`,
      language: language('typescript'),
      wip: false
    },
    {
      name: 'shikigami',
      description:
        'Opinionated syntax highlighting with [shiki](https://github.com/shikijs/shiki) for [markdown-it](https://github.com/markdown-it/markdown-it).',
      url: `${GH_BASE}/shikigami`,
      language: language('typescript'),
      wip: false
    },
    {
      name: 'rsx',
      description: 'Micro CLI for interactive execution of npm & yarn scripts.',
      url: `${GH_BASE}/rsx`,
      language: language('rust'),
      wip: true
    },
    {
      name: 'arx',
      description: 'Simple CLI for scaffolding projects from templates in a touch.',
      url: `${GH_BASE}/arx`,
      language: language('rust'),
      wip: true
    },
    {
      name: 'diceware',
      description:
        'Rust crate and CLI for generating [Diceware](https://en.wikipedia.org/wiki/Diceware) passphrases.',
      url: `${GH_BASE}/diceware`,
      language: language('rust'),
      wip: false
    }
  ]
}

export async function loadProjects(): Promise<Array<Project>> {
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
