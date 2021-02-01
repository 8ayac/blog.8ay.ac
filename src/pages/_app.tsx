import { nextSEOConfig } from '@/next-seo.config';
import { BasicLayout } from '@/src/components/layouts/BasicLayout';
import { theme } from '@/src/constants/theme';
import { globalStyle } from '@/src/shared/styles/global';
import { Global, ThemeProvider } from '@emotion/react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import React from 'react';

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
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
