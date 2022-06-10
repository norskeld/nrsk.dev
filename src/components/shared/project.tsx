import { css } from '@emotion/react'

import type { Project } from '@/api/projects'
import type { Language } from '@/utils/language'
import { to } from '@/utils/css'

import AppLink from '@/components/shared/link'

interface ProjectProps {
  data: Project
}

interface ProjectNameProps {
  name: string
  url: string
}

const projectCss = css`
  color: inherit;
  width: 100%;

  border: 1px solid var(--contrast-950);
  border-radius: 0.5rem;

  padding: 1.25rem 1.5rem;

  text-align: left;
  text-decoration: none;

  user-select: none;

  &:hover {
    cursor: pointer;
    border-color: var(--contrast-900);
    box-shadow: 0 1rem 2.5rem var(--contrast-950);
  }

  &:hover ${to`project-lang`} {
    opacity: 1;
  }

  transition: box-shadow 150ms ease-in-out;
`

const headerCss = css`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const nameCss = css`
  font-size: 1.25rem;
  font-weight: 700;

  & a {
    color: var(--text);
    padding-bottom: 0.1rem;
    border-bottom: 2px solid var(--contrast-900);
  }

  & a:focus,
  & a:hover {
    color: var(--link-hover);
    border-color: var(--link-hover);
  }
`

const projectDescriptionCss = css`
  font-size: 1.15rem;

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
`

const languageCss = css`
  label: project-lang;

  padding: 0.25rem 0.3rem 0.25rem 0.25rem;

  color: #fff;
  border-radius: 0.25rem;

  font-size: 0.65rem;
  font-family: var(--font-mono);
  font-weight: bolder;

  cursor: help;
  opacity: 1;

  transition: transform 150ms ease-in-out, opacity 150ms ease-in-out;
  transform: scale(1) rotate(0deg);

  &:hover {
    transform: scale(1.1) rotate(-5deg);
  }

  @media screen and (min-width: 560px) {
    opacity: 0.25;
  }
`

const languageWithColorCss = (color: string) => css`
  ${languageCss}
  background-color: ${color};
`

export default function Project({ data }: ProjectProps) {
  const { name, description, url, language } = data

  return (
    <article css={projectCss}>
      <ProjectHeader>
        <ProjectName {...{ name, url }} />
        <ProjectLanguage {...language} />
      </ProjectHeader>

      <p css={projectDescriptionCss} dangerouslySetInnerHTML={{ __html: description }} />
    </article>
  )
}

function ProjectHeader({ children }: React.ComponentPropsWithoutRef<'header'>) {
  return <header css={headerCss}>{children}</header>
}

function ProjectName({ name, url }: ProjectNameProps) {
  return (
    <div css={nameCss}>
      <AppLink external href={url}>
        {name}
      </AppLink>
    </div>
  )
}

function ProjectLanguage({ name, ext, color }: Language) {
  return (
    <div title={name} css={languageWithColorCss(color)}>
      {ext}
    </div>
  )
}
