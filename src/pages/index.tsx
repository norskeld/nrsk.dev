import type { GetStaticProps } from 'next'
import { css } from '@emotion/react'

import { getPosts, type Post } from '@/api/posts'
import { getProjects, type Project } from '@/api/projects'

import {
  AboutSection,
  Projects,
  ProjectsSection,
  RecentArticlesSection,
  RecentArticles
} from '@/components/screens/home'

import Heading from '@/components/shared/heading'
import Accent from '@/components/shared/accent'
import Layout from '@/layouts/base'

interface Props {
  posts: Array<Post>
  projects: Array<Project>
}

const headingCss = css`
  font-weight: 800;
`

/** The home page. */
export default function ({ posts, projects }: Props) {
  return (
    <Layout>
      <AboutSection>
        <Heading css={headingCss} level={1}>
          Hi. I'm <Accent>Vlad</Accent>.
        </Heading>

        <Heading level={1}>
          I'm a TypeScript devotee, Rust tyro, functional programming admirer, and front-end
          shepherd.
        </Heading>
      </AboutSection>

      <RecentArticlesSection>
        <Heading disableSelection shadow shadowColor="var(--accent-lightest)" level={1}>
          Recent articles
        </Heading>

        <p>
          I occasionally write about <strong>TypeScript</strong>, <strong>Rust</strong>,{' '}
          <strong>functional programming</strong>, and <strong>front-end</strong> stuff.
        </p>

        <RecentArticles posts={posts} />
      </RecentArticlesSection>

      <ProjectsSection>
        <Heading disableSelection shadow shadowColor="var(--yellow-lightest)" level={1}>
          Projects
        </Heading>

        <p>Some of my OSS projects.</p>

        <Projects projects={projects} />
      </ProjectsSection>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPosts()
  const projects = await getProjects()

  return {
    props: {
      posts,
      projects
    }
  }
}
