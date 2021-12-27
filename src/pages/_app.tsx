import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'

import { Seo } from '@/seo.config'

import '@/styles/constraints.css'
import '@/styles/typography.css'
import '@/styles/colors.css'
import '@/styles/reset.css'
import '@/styles/global.css'

import ContentMotion from '@/components/transitions/content'
import Wrapper from '@/components/shared/wrapper'
import Footer from '@/components/shared/footer'
import Nav from '@/components/shared/nav'

export default function CustomApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()

  return (
    <Wrapper>
      <DefaultSeo {...Seo} />
      <Nav />

      <ContentMotion location={asPath}>
        <Component key={asPath} {...pageProps} />
      </ContentMotion>

      <Footer />
    </Wrapper>
  )
}
