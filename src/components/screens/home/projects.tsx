import { css } from '@emotion/react'

import type { Project } from '@/api/projects'

import ProjectPreview from '@/components/shared/project'

interface ProjectsProps {
  projects: Array<Project>
}

const projectsCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1.25rem;

  padding-top: 1.5rem;
`

const sectionCss = css`
  padding-top: 2rem;

  @media screen and (min-width: 560px) {
    padding-top: 3rem;
  }
`

export function Projects({ projects }: ProjectsProps) {
  return (
    <section css={projectsCss}>
      {projects.map((project, index) => (
        <ProjectPreview key={index} data={project} />
      ))}
    </section>
  )
}

export function ProjectsSection({ children }: React.ComponentPropsWithoutRef<'section'>) {
  return <section css={sectionCss}>{children}</section>
}
