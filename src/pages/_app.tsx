import { BasicLayout } from '@/src/components/layouts/BasicLayout';
import { theme } from '@/src/constants/theme';
import { globalStyle } from '@/src/shared/styles/global';
import { Global, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Head>
        <title>blog.8ay.ac</title>
      </Head>

      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </ThemeProvider>
  </>
);

export default App;
