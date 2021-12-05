import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'

import { getAllPostIds, getPostData, Post } from '@/api/posts'

import Heading from '@/components/heading'
import Content from '@/components/content'
import Layout from '@/components/layout'
import Article from '@/components/post'
import Back from '@/components/back'
import Date from '@/components/date'
import Meta from '@/components/meta'

interface Props {
  post: Post
}

export default function PostPage({ post }: Props) {
  const { title, date, content } = post

  return (
    <Layout>
      <Meta />

      <Head>
        <title>{title}</title>
      </Head>

      <Article>
        <Heading level={1} size="xxl">
          {title}
        </Heading>

        <Date date={date} />

        <Content html={content} />

        <Back />
      </Article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const post = await getPostData(params?.id as string)

  return {
    props: {
      post
    }
  }
}
