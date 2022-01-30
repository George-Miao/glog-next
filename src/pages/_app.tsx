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
