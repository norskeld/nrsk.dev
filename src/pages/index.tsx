import { GetStaticProps } from 'next'
import { css } from '@emotion/react'

import { getPosts, Post } from '@/api/posts'

import { AboutSection, RecentArticlesSection, RecentArticles } from '@/components/screens/home'

import Heading from '@/components/shared/heading'
import Accent from '@/components/shared/accent'
import Layout from '@/layouts/base'

interface Props {
  posts: Array<Post>
}

const headingCss = css`
  font-weight: 800;
`

/** The home page. */
export default function ({ posts }: Props) {
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
        <Heading level={1}>Recent articles</Heading>

        <p>
          I occasionally write about <strong>TypeScript</strong>, <strong>Rust</strong>,{' '}
          <strong>functional programming</strong>, and <strong>front-end</strong> stuff.
        </p>

        <RecentArticles posts={posts} />
      </RecentArticlesSection>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPosts()

  return {
    props: {
      posts
    }
  }
}
