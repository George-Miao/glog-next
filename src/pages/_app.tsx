import 'windi.css'
import 'styles/globals.css'
import 'styles/highlight.css'

import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

import Layout from '@comps/layout/layout'

import type { AppProps } from 'next/app'
import { defaultSeo } from '@core/config'
import SEO from '@comps/seo'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/bkc5luv.css" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#be223a" />
      </Head>
      <Layout>
        <DefaultSeo {...defaultSeo} />
        <SEO />
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
