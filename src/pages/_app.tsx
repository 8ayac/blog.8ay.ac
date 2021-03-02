import { nextSEOConfig } from '@/next-seo.config';
import { BasicLayout } from '@/src/components/layouts/BasicLayout';
import { theme } from '@/src/constants/theme';
import { globalStyle } from '@/src/shared/styles/global';
import { Global, ThemeProvider } from '@emotion/react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <Head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
        rel="stylesheet"
      />
    </Head>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <DefaultSeo {...nextSEOConfig} />

      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </ThemeProvider>
  </>
);

export default App;
