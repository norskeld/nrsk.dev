import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'

import { Seo } from '@/seo.config'

import '@/styles/constraints.css'
import '@/styles/typography.css'
import '@/styles/colors.css'
import '@/styles/reset.css'
import '@/styles/global.css'

export default function CustomApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()

  return (
    <>
      <DefaultSeo {...Seo} />

      <AnimatePresence exitBeforeEnter onExitComplete={() => window.scrollTo(0, 0)}>
        <Component key={asPath} {...pageProps} />
      </AnimatePresence>
    </>
  )
}
