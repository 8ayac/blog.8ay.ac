import { theme } from '@/src/constants/theme';
import ArticleIndexPage from '@/src/pages/articles';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('ArticleIndexPage', () => {
  const testArticles = [
    {
      id: 'test-article-01',
      title: 'Test Title 01',
      tags: ['test01'],
      publishedAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-02',
      title: 'Test Title 02',
      tags: ['test02'],
      publishedAt: new Date('2021-02-02T00:00:00.000Z'),
      updatedAt: new Date('2021-02-02T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    },
  ];

  test('is rendered correctly to match the snapshot', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ArticleIndexPage articles={testArticles} />
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
