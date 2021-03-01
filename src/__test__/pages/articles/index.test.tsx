import { config } from '@/site.config';
import { theme } from '@/src/constants/theme';
import ArticleIndexPage from '@/src/pages/articles';
import { mockArticleData } from '@/src/shared/__mocks__/articleData';
import { Article } from '@/src/types';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('ArticleIndexPage', () => {
  const testArticles: Article[] = [mockArticleData.t1, mockArticleData.t2];

  describe('is rendered correctly', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ArticleIndexPage articles={testArticles} />
      </ThemeProvider>
    );

    test('to match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('so that the header links to the appropriate page', () => {
      expect(
        wrapper.find('BodyHeader').first().find('Link').find('a').prop('href')
      ).toBe(config.page.articles.root);
    });
  });
});
