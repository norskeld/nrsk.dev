import { GetStaticProps } from 'next'

import { getSortedPostsData, PostId, PostMatter } from '@/api/posts'

import { Card, CardDate, CardExcerpt, CardHeader, CardContainer } from '@/components/card'
import { HeroAbout, HeroArticles } from '@/components/hero'
import Heading from '@/components/heading'
import Layout from '@/components/layout'
import Accent from '@/components/accent'

interface Props {
  posts: Array<PostId & PostMatter>
}

export default function HomePage({ posts }: Props) {
  return (
    <Layout>
      <About />
      <Articles posts={posts} />
    </Layout>
  )
}

function About() {
  return (
    <HeroAbout>
      <Heading level={1} size="xxl">
        Hi. I'm <Accent color="var(--accent)">Vlad</Accent>.
      </Heading>

      <Heading level={1} size="xl">
        I'm a TypeScript devotee, Rust tyro, functional programming admirer, and front-end shepherd.
      </Heading>
    </HeroAbout>
  )
}

function Articles({ posts }: Props) {
  return (
    <HeroArticles>
      <Heading level={1}>Articles</Heading>

      <p>
        I occasionally write about <strong>TypeScript</strong>, <strong>Rust</strong>,{' '}
        <strong>functional programming</strong>, and <strong>OSS projects</strong>.
      </p>

      <CardContainer>
        {posts.map(({ id, date, title, excerpt }) => (
          <Card key={id} href={`/posts/${id}`}>
            <CardHeader>{title}</CardHeader>
            {date && <CardDate date={date} />}
            {excerpt && <CardExcerpt>{excerpt}</CardExcerpt>}
          </Card>
        ))}
      </CardContainer>
    </HeroArticles>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getSortedPostsData()

  return {
    props: {
      posts
    }
  }
}
