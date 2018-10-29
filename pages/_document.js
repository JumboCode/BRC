import Document, { Head, Main, NextScript } from 'next/document'
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig()

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    let GoogleMapUrl = "https://maps.googleapis.com/maps/api/js?key=" + publicRuntimeConfig.MAP_KEY + "&libraries=places";
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>BiSpot: Find a Bi Group Around Me</title>
          <style jsx global>{``}</style>
          <script type="text/javascript" src={GoogleMapUrl}></script>
          <link rel="shortcut icon" type="image/png" href="./static/images/favicon.ico"/>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}