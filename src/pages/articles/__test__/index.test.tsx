import ArticleIndexPage from '@/src/pages/articles';
import { mount } from 'enzyme';
import React from 'react';

describe('ArticleIndexPage', () => {
  const testArticles = [
    {
      id: 'test-article-01',
      title: 'Test Title 01',
      tags: ['test01'],
      publishedAt: '2021-01-01 00:00:00 +0000',
      updatedAt: '2021-01-01 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-02',
      title: 'Test Title 02',
      tags: ['test02'],
      publishedAt: '2021-02-02 00:00:00 +0000',
      updatedAt: '2021-02-02 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
  ];

  test('is rendered correctly to match the snapshot', () => {
    const wrapper = mount(<ArticleIndexPage articles={testArticles} />);
    expect(wrapper).toMatchSnapshot();
  });
});
