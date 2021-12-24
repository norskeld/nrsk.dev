import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'

import { Seo } from '@/seo.config'

import '@/styles/constraints.css'
import '@/styles/typography.css'
import '@/styles/colors.css'
import '@/styles/reset.css'
import '@/styles/global.css'

export default function VmApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...Seo} />
      <Component {...pageProps} />
    </>
  )
}
