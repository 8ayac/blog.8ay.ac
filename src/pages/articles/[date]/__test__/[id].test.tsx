import { theme } from '@/src/constants/theme';
import ArticlePage from '@/src/pages/articles/[date]/[id]';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('ArticlePage', () => {
  const testArticleData = {
    attributes: {
      id: 'example-id',
      title: 'Example01',
      publishedAt: new Date('2021-01-02T03:04:56.000Z'),
      updatedAt: new Date('2021-01-02T03:04:56.000Z'),
    },
    body: '## test\r\n\r\nbluhbluhbluh',
  };

  it('is rendered correctly to match the snapshot', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ArticlePage article={testArticleData} />
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
