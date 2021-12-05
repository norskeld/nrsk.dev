import { GetStaticProps } from 'next'
import Head from 'next/head'

import { getSortedPostsData, PostId, PostMatter } from '@/api/posts'
import { metadata } from '@/metadata'

import { Card, CardDate, CardExcerpt, CardHeader, CardContainer } from '@/components/card'
import { HeroAbout, HeroArticles } from '@/components/hero'
import Heading from '@/components/heading'
import Layout from '@/components/layout'
import Accent from '@/components/accent'
import Meta from '@/components/meta'

interface Props {
  posts: Array<PostId & PostMatter>
}

export default function HomePage({ posts }: Props) {
  return (
    <Layout>
      <Meta />

      <Head>
        <title>{metadata.title}</title>
      </Head>

      <HeroAbout>
        <Heading level={1} size="xxl">
          Hi. I'm <Accent color="var(--accent)">Vlad</Accent>.
        </Heading>

        <Heading level={1} size="xl">
          I'm a TypeScript devotee, Rust tyro, functional programming admirer, and front-end
          shepherd.
        </Heading>
      </HeroAbout>

      <HeroArticles>
        <Heading level={1}>Articles</Heading>

        <p>
          I occasionally write about <strong>TypeScript</strong>, <strong>Rust</strong>,{' '}
          <strong>Haskell</strong> and <strong>OSS projects</strong>.
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
    </Layout>
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
