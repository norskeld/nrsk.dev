export * from './articles'
export * from './projects'

export type Order = 'asc' | 'none' | 'desc'

export interface LoaderOptions {
  sort: Order
  limit: number
}

export function defaults(options?: Partial<LoaderOptions>): LoaderOptions {
  return {
    sort: 'none',
    limit: -1,
    ...options
  }
}
