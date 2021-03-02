import { config } from '@/site.config';
import { theme } from '@/src/constants/theme';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import urljoin from 'url-join';

const GATag: React.FC = () => (
  <>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-YWW1B54WXF"
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `  window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-YWW1B54WXF');`,
      }}
    />
  </>
);

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render = (): JSX.Element => (
    <Html lang="ja">
      <Head>
        <GATag />
        <link
          rel="icon"
          type="image/png"
          href={urljoin(config.site.rootUrl, 'img', 'favicon.png')}
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content={theme.color.global.body.bg} />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
