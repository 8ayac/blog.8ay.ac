import { theme } from '@/src/constants/theme';
import TagsPage from '@/src/pages/tags/[name]';
import { mockArticleData } from '@/src/shared/__mocks__/articleData';
import { Article } from '@/src/types';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('TagPage', () => {
  const testTagName = 'custom-test-tag';
  const testArticles: Article[] = [
    {
      ...mockArticleData.t1,
      attributes: {
        ...mockArticleData.t1.attributes,
        tags: [testTagName],
      },
    },
    {
      ...mockArticleData.t2,
      attributes: {
        ...mockArticleData.t2.attributes,
        tags: [testTagName],
      },
    },
  ];

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <TagsPage name={testTagName} filteredArticles={testArticles} />
        </ThemeProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('title header of the page', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <TagsPage name={testTagName} filteredArticles={testArticles} />
        </ThemeProvider>
      );
      expect(wrapper.find('BodyHeader').first().text()).toBe(
        `Tag: ${testTagName}`
      );
    });
  });
});
