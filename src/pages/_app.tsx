import { AppProps } from 'next/app'

import '@/styles/constraints.css'
import '@/styles/colors.css'
import '@/styles/reset.css'
import '@/styles/global.css'

export default function VmApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
