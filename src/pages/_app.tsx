import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'

import { smoothScrollPolyfill } from '@/utils/polyfills'
import { GA_ID } from '@/content.config'
import { Seo } from '@/seo.config'

import '@/styles/constraints.css'
import '@/styles/typography.css'
import '@/styles/colors.css'
import '@/styles/reset.css'
import '@/styles/global.css'

smoothScrollPolyfill()

import GoogleAnalytics from '@/components/shared/analytics'

export default function CustomApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()

  const onExitComplete = () =>
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

  return (
    <>
      <DefaultSeo {...Seo} />
      <GoogleAnalytics id={GA_ID} />

      <AnimatePresence exitBeforeEnter initial={false} onExitComplete={onExitComplete}>
        <Component key={asPath} {...pageProps} />
      </AnimatePresence>
    </>
  )
}
