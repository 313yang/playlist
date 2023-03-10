import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import Script from "next/script";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="title" content="Soundy" />
          <meta property="og:title" content="Soundy" />
          <meta property="og:description" content="Make music playlist to your mood" />
          <meta name="description" content="Make music playlist to your mood" />
          <meta name="Keywords" content="playlist, music, spotify, youtube" />
          <meta name="image" content="/favicon.ico" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="naver-site-verification" content="ba02d1f241b85b328285fa858eec8d21732f186a" />
        </Head>
        <body>
          {/* <!-- Google tag (gtag.js) --> */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-1LD7BTF3V9"></Script>
          <Script
            id="gtag-init"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1LD7BTF3V9');`,
            }}
          ></Script>
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-1LD7BTF3V9"
          ></Script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
