import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class VmDocument extends Document {
  render() {
    return (
      <Html lang="en" prefix="og: http://ogp.me/ns#">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
