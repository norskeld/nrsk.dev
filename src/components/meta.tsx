import Head from 'next/head'

import { metadata } from '@/metadata'

export default function Meta() {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="manifest" href="/site.webmanifest" />

      <meta name="theme-color" content="#ffffff" />
      <meta name="author" content={metadata.author} />
      <meta name="description" content={metadata.description} />
    </Head>
  )
}
