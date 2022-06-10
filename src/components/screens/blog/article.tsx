import { css } from '@emotion/react'
import React from 'react'

import arrowBendDownRight from '~/icons/arrow-bend-down-right.svg'
import arrowBendUpRight from '~/icons/arrow-bend-up-right.svg'

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

  /** -- General. */

  & .shiki {
    border-radius: 0;
    margin: 1.5rem -1.5rem;
    font-size: 0.9rem;
  }

  & blockquote .shiki {
    margin: 1.5rem 0;
  }

  & .shiki code {
    display: flex;
    flex-direction: row;
    white-space: nowrap;
  }

  /** -- Line numbers. */

  & .shiki .line-numbers {
    padding: 0.75rem 0;
    color: var(--contrast-600);
    text-align: right;
    user-select: none;
  }

  & .shiki .line-numbers .line-number {
    min-width: 1.5rem;
    padding: 0 1rem;
  }

  /** -- Lines. */

  & .shiki .lines {
    display: grid;
    width: 100%;
    padding: 0.75rem 1rem;
    overflow-x: auto;
  }

  & .shiki .line-numbers + .lines {
    padding: 0.75rem 0;
  }

  & .shiki .lines .line {
    padding-right: 2rem;
    white-space: pre;
  }

  /** -- Highlight. */

  & .shiki :where(.lines, .line-numbers) :where(.highlight-invert) {
    opacity: 0.35;
  }

  &
    .shiki
    :where(.lines, .line-numbers)
    :where(.highlight, .highlight-start, .highlight-inner, .highlight-end) {
    background: #434c5e58;
    opacity: 1;
  }

  /** -- Language label. */

  & .shiki .language-id {
    background: var(--contrast-100);
    color: var(--contrast-500);
    padding: 0.5rem 1rem;
    border-radius: 0;
    border-bottom: 1px solid var(--contrast-200);
    user-select: none;
  }

  & blockquote .shiki {
    border-radius: 0.5rem;
  }

  & blockquote .shiki .language-id {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  @media screen and (min-width: 560px) {
    & .shiki {
      border-radius: 0.5rem;
      margin: 1.5rem 0;
    }

    & .shiki .language-id {
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }
  }

  /** Inline code. */

  & :not(pre) > code {
    background: var(--contrast-950);
    padding: 0.15rem 0.35rem;
    border-radius: 0.25rem;
    white-space: nowrap;
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

  & h1,
  & h2 {
    border-bottom: 2px solid var(--contrast-950);
  }

  & h1:first-of-type {
    border: 0;
  }

  & a.header-anchor {
    color: var(--contrast-800);
    opacity: 1;
    border: 0;
    transition: color 150ms ease-in-out, opacity 150ms ease-in-out;
  }

  & a.header-anchor:hover {
    color: var(--text);
  }

  @media screen and (min-width: 768px) {
    & a.header-anchor {
      opacity: 0;
    }

    & :is(h1, h2, h3, h4, h5, h5):hover a.header-anchor {
      opacity: 1;
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

  /** Abbreviations. */

  & abbr {
    cursor: help;
    border-bottom: 2px dotted var(--text);
  }

  /** Strikethrough.  */

  & s {
    text-decoration: line-through;
  }

  /* Lists. */

  & ul {
    margin: 1rem 0;
    padding-left: 1.25em;
  }

  @media screen and (min-width: 768px) {
    & ul {
      margin: 1rem 1rem;
    }
  }

  /* Collapsible. */

  & details {
    padding: 0 1.5rem 0;
    border-radius: 0.5rem;
    background: var(--contrast-950);
  }

  & details > summary {
    padding: 1rem 1.5rem;
    margin: 0 -1.5rem;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    user-select: none;
    list-style-type: none;
    background: var(--contrast-950);
    border-radius: 0.5rem;
    transition: background 150ms ease-in-out;
  }

  & details > summary::before {
    content: '';
    background-image: url(${arrowBendDownRight.src});
    background-repeat: no-repeat;
    background-size: contain;
    font-family: var(--font-mono);
    font-size: 1.25rem;
    padding-right: 2rem;
  }

  & details > summary:hover {
    background: var(--contrast-900);
  }

  & details[open] {
    padding: 0 1.5rem 1.5rem;
  }

  & details[open] > summary {
    background: var(--contrast-900);
    border-radius: 0.5rem 0.5rem 0 0;
  }

  & details[open] > summary::before {
    background-image: url(${arrowBendUpRight.src});
  }

  & details[open] > :not(summary, pre) {
    margin: 1.5rem 0;
  }

  & details[open] > :not(summary):last-child {
    margin-bottom: 0;
  }

  & ::-webkit-details-marker {
    display: none;
  }
`

export function ArticleFooter({ children }: React.ComponentPropsWithoutRef<'footer'>) {
  return <footer css={footerCss}>{children}</footer>
}

export function ArticleContent({ html }: ArticleContentProps) {
  return <article css={contentCss} dangerouslySetInnerHTML={{ __html: html }} />
}
