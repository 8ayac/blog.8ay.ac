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

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render = (): JSX.Element => (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/png"
          href={urljoin(config.site.rootUrl, 'img', 'favicon.png')}
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
