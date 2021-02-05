import { theme } from '@/src/constants/theme';
import ArticleIndexPage from '@/src/pages/articles';
import { mockArticleData } from '@/src/shared/__mocks__/articleData';
import { Article } from '@/src/types';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('ArticleIndexPage', () => {
  const testArticles: Article[] = [mockArticleData.t1, mockArticleData.t2];

  test('is rendered correctly to match the snapshot', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ArticleIndexPage articles={testArticles} />
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
