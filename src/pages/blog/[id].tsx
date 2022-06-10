import type { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { getPostsId, getPost, type Post } from '@/api/posts'
import { Common } from '@/seo.config'

import { ArticleContent, ArticleFooter } from '@/components/screens/blog'

import ScrollTo from '@/components/shared/scroll-to'
import Heading from '@/components/shared/heading'
import Date from '@/components/shared/date'
import Layout from '@/layouts/base'

interface Props {
  post: Post
}

/** The blog article page. */
export default function ({ post }: Props) {
  const { title, date, content, excerpt: description } = post
  const { asPath } = useRouter()

  const url = Common.host + asPath

  return (
    <Layout>
      <NextSeo
        title={title}
        canonical={url}
        description={description}
        openGraph={{
          type: 'article',
          title,
          description,
          url
        }}
      />

      <header>
        <Heading shadow level={1} size="xxl">
          {title}
        </Heading>

        <Date date={date} />
      </header>

      <ArticleContent html={content} />

      <ArticleFooter>
        <ScrollTo top={0} left={0} behavior="smooth">
          Scroll to top &uarr;
        </ScrollTo>
      </ArticleFooter>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostsId()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const post = await getPost(params?.id as string)

  return {
    props: {
      post
    }
  }
}
