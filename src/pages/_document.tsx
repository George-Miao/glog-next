import { fontVars } from '@config'
import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang='en' className={fontVars}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
