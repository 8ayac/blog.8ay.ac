import { theme } from '@/src/constants/theme';
import TopPage from '@/src/pages';
import { mockArticleData } from '@/src/shared/__mocks__/articleData';
import { Article } from '@/src/types';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('TopPage', () => {
  const testArticles: Article[] = [mockArticleData.t1, mockArticleData.t2];

  test('is rendered correctly to match the snapshot', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <TopPage articles={testArticles} />
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('has proper style rules', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <TopPage articles={testArticles} />
      </ThemeProvider>
    );

    test('in ArticleListSection', () => {
      expect(wrapper.find('S-ArticleListSection')).toHaveStyleRule(
        'margin-bottom',
        '4rem'
      );
    });

    test('in TagListSection', () => {
      expect(wrapper.find('S-TagListSection')).toHaveStyleRule(
        'margin-bottom',
        '4rem'
      );
    });
  });
});
