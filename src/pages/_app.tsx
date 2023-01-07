import 'styles/globals.css'
import 'styles/highlight.css'
import 'windi.css'

import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

import Layout from '@comps/layout/layout'

import SEO from '@comps/seo'
import { defaultSeo } from '@config'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='stylesheet' href='https://use.typekit.net/bkc5luv.css' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#be223a' />
        <meta name='msapplication-TileColor' content='#FFFFFF' />
        <meta name='theme-color' content='#be223a' />
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
