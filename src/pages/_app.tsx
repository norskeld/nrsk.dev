import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'

import { ACKEE_DOMAIN_ID, ACKEE_HOST, ACKEE_TRACKER } from '@/content.config'
import { smoothScrollPolyfill } from '@/utils/polyfills'
import { Seo } from '@/seo.config'

import '@/styles/constraints.css'
import '@/styles/typography.css'
import '@/styles/colors.css'
import '@/styles/reset.css'
import '@/styles/global.css'

smoothScrollPolyfill()

import Analytics from '@/components/shared/analytics'

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
      <Analytics id={ACKEE_DOMAIN_ID} host={ACKEE_HOST} tracker={ACKEE_TRACKER} />

      <AnimatePresence exitBeforeEnter initial={false} onExitComplete={onExitComplete}>
        <Component key={asPath} {...pageProps} />
      </AnimatePresence>
    </>
  )
}
