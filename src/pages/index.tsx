import { GetStaticProps } from 'next'

import { getPosts, Post } from '@/api/posts'

import { AboutSection, RecentArticlesSection, RecentArticles } from '@/components/screens/home'

import Container from '@/components/shared/container'
import Heading from '@/components/shared/heading'
import Accent from '@/components/shared/accent'

interface Props {
  posts: Array<Post>
}

/** The home page. */
export default function ({ posts }: Props) {
  return (
    <Container>
      <AboutSection>
        <Heading level={1} size="xxl">
          Hi. I'm <Accent color="var(--accent)">Vlad</Accent>.
        </Heading>

        <Heading level={1} size="xl">
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
    </Container>
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
