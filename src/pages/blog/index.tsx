import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'

import { getPosts, Post } from '@/api/posts'
import { inflect } from '@/utils/inflection'
import { Common } from '@/seo.config'

import { Articles } from '@/components/screens/blog'

import Container from '@/components/shared/container'
import Heading from '@/components/shared/heading'
import Layout from '@/layouts/base'

interface Props {
  posts: Array<Post>
}

/** The blog index page. */
export default function ({ posts }: Props) {
  const { asPath } = useRouter()

  const seo = {
    title: `Blog`,
    description: `Vladislav's blog posts.`,
    url: Common.host + asPath
  }

  const toBeInflected = inflect([`there's only`, `there're`], posts.length)
  const articleInflected = inflect(['article', 'articles'], posts.length)

  return (
    <Layout>
      <NextSeo
        title={seo.title}
        canonical={seo.url}
        description={seo.description}
        openGraph={{ ...seo }}
      />

      <Heading level={1} size="xxl">
        {seo.title}
      </Heading>

      <p>
        So far {toBeInflected} <strong>{posts.length}</strong> {articleInflected}, but I'm working
        on new stuff!
      </p>

      <Articles posts={posts} />
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
