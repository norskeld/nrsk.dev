import { css } from '@emotion/react'

interface ArticleFooterProps {
  children: React.ReactNode
}

interface ArticleContentProps {
  html: string
}

const footerCss = css`
  display: flex;
  justify-content: center;
  padding: 3rem 0 0;
`

const contentCss = css`
  width: 100%;

  /** Paragraphs. */

  & p {
    margin: 1.25em 0;
  }

  /** Horizontal divider. */

  & hr {
    display: block;
    width: 75%;
    margin: 2rem auto;
    border: 1px solid var(--contrast-950);
  }

  & hr:first-of-type {
    display: none;
  }

  /** General <pre> and <code> styling. */

  & pre,
  & code {
    font-family: var(--font-mono);
  }

  /** Code highlighting. */

  & .shiki {
    border-radius: 0;
    margin: 0 -1.5rem;
    font-size: 1rem;
  }

  & .shiki code {
    display: block;
    padding: 1rem 1.5rem;
    overflow-x: scroll;
  }

  & .language-id {
    background: var(--black);
    color: var(--contrast-500);
    padding: 0.5rem 1.5rem;
    border-radius: 0;
  }

  @media screen and (min-width: 560px) {
    & .shiki {
      border-radius: 0.5rem;
      margin: 0;
    }

    & .language-id {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
  }

  /** Inline code. */

  & :not(pre) code {
    background: var(--contrast-950);
    padding: 0.15rem 0.35rem;
    border-radius: 0.25rem;
  }

  /** Blockquotes. */

  & q,
  & blockquote {
    color: var(--contrast-400);
    padding: 0 1rem;
    margin: 0 0 1rem;
    border-left: 0.4rem solid var(--contrast-900);
  }

  /** Links. */

  & a {
    padding-bottom: 0.05rem;
    border-bottom: 2px solid rgba(var(--accent-base), 0.125);
    color: var(--accent);
  }

  & a:focus,
  & a:hover {
    color: var(--link-hover);
    border-color: var(--link-hover);
  }

  /** Headers. */

  & a.header-anchor {
    border: 0;
    position: static;
    color: var(--contrast-900);
    transition: color 100ms ease-in-out;
  }

  & a.header-anchor:focus,
  & a.header-anchor:hover {
    color: var(--text);
  }

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    position: relative;
  }

  @media screen and (min-width: 560px) {
    & a.header-anchor {
      position: absolute;
      right: 101%;
      top: 0;
      text-align: right;
    }
  }

  /** Tables. */

  & table {
    width: 100%;
    max-width: 100%;
    font-size: 1.15rem;
  }

  & table tr,
  & table td,
  & table th {
    padding: 0.5rem 0.75rem;
  }

  & table tr {
    border-bottom: 1px solid var(--contrast-900);
  }

  & th {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    text-align: left;
    background-color: var(--contrast-900);
  }

  /** Images. */

  & img {
    width: 100%;
    border-radius: 0.5rem;
  }
`

export function ArticleFooter({ children }: ArticleFooterProps) {
  return <footer css={footerCss}>{children}</footer>
}

export function ArticleContent({ html }: ArticleContentProps) {
  return <article css={contentCss} dangerouslySetInnerHTML={{ __html: html }} />
}
