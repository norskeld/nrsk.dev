import { format, parseISO } from 'date-fns'
import { css } from '@emotion/react'

import AppLink from '@/components/shared/link'

interface ArticleProps {
  href: string
  title: string
  date: string
  excerpt?: string
}

interface ArticleHeadingProps {
  href: string
  title: string
}

interface ArticleHeaderProps {
  children: React.ReactNode
}

interface ArticleExcerptProps {
  children: React.ReactNode
}

interface ArticleDateProps {
  date: string
}

const articleCss = css`
  color: inherit;
  width: 100%;
  padding-bottom: 2rem;
  text-align: left;
  text-decoration: none;
  transition: color 150ms ease;
`

const headingCss = css`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;

  & a {
    padding-bottom: 0.1rem;
    border-bottom: 2px solid var(--contrast-900);
  }

  & a:focus,
  & a:hover {
    color: var(--link-hover);
    border-color: var(--link-hover);
  }
`

const headerCss = css`
  margin-bottom: 0.5rem;
`

const dateCss = css`
  display: inline-block;
  color: var(--contrast-400);
  font-size: 1rem;
`

const excerptCss = css`
  margin: 0;
  line-height: 1.5;
`

export default function Article({ title, href, excerpt, date }: ArticleProps) {
  return (
    <article css={articleCss}>
      <ArticleHeader>
        <ArticleHeading href={href} title={title} />
        <ArticleDate date={date} />
      </ArticleHeader>

      <ArticleExcerpt>{excerpt}</ArticleExcerpt>
    </article>
  )
}

function ArticleHeader({ children }: ArticleHeaderProps) {
  return <header css={headerCss}>{children}</header>
}

function ArticleHeading({ href, title }: ArticleHeadingProps) {
  return (
    <h2 css={headingCss}>
      <AppLink href={href}>
        <a>{title}</a>
      </AppLink>
    </h2>
  )
}

function ArticleDate({ date }: ArticleDateProps) {
  return (
    <time css={dateCss} dateTime={date}>
      {format(parseISO(date), 'LLLL d, yyyy')}
    </time>
  )
}

function ArticleExcerpt({ children }: ArticleExcerptProps) {
  return <p css={excerptCss}>{children}</p>
}
