type LanguageKind = 'typescript' | 'javascript' | 'haskell' | 'rust'

export interface Language {
  kind: LanguageKind
  name: string
  ext: string
  color: string
}

const languages: Array<Language> = [
  {
    kind: 'typescript',
    name: 'TypeScript',
    ext: '.ts',
    color: '#3178c6'
  },
  {
    kind: 'javascript',
    name: 'JavaScript',
    ext: '.js',
    color: '#f1e05a'
  },
  {
    kind: 'rust',
    name: 'Rust',
    ext: '.rs',
    color: '#dea584'
  },
  {
    kind: 'haskell',
    name: 'Haskell',
    ext: '.hs',
    color: '#5e5086'
  }
]

export function language(lang: LanguageKind): Language {
  return languages.find(({ kind }) => kind === lang)!
}
