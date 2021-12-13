import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { getAllPostIds, getPostData, Post } from '@/api/posts'
import { Common } from '@/seo'

import ArticleContainer from '@/components/post'
import Heading from '@/components/heading'
import Content from '@/components/content'
import Layout from '@/components/layout'
import Back from '@/components/back'
import Date from '@/components/date'

interface Props {
  post: Post
}

export default function PostPage({ post }: Props) {
  const { title, excerpt: description } = post
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

      <Article post={post} />
    </Layout>
  )
}

function Article({ post }: Props) {
  const { title, date, content } = post

  return (
    <ArticleContainer>
      <Heading level={1} size="xxl">
        {title}
      </Heading>

      <Date date={date} />
      <Content html={content} />

      <Back />
    </ArticleContainer>
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
