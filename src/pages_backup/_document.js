// src/pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* AdSense verification script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4918938808225819"
          crossOrigin="anonymous"
        />
        {/* Optional: Google site verification meta tag */}
        <meta
          name="google-adsense-account" content="ca-pub-4918938808225819"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
