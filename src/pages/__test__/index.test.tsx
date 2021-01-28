import TopPage from '@/src/pages';
import { mount } from 'enzyme';
import React from 'react';

describe('TopPage', () => {
  const testCategories = ['test-cat01', 'test-cat02', 'test-cat03'];
  const testArticles = [
    {
      id: 'test-article-01',
      title: 'Test Title 01',
      tags: testCategories.slice(0, 3),
      publishedAt: '2021-01-01 00:00:00 +0000',
      updatedAt: '2021-01-01 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-02',
      title: 'Test Title 02',
      tags: testCategories.slice(0, 2),
      publishedAt: '2021-02-02 00:00:00 +0000',
      updatedAt: '2021-02-02 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-03',
      title: 'Test Title 03',
      tags: testCategories.slice(0, 1),
      publishedAt: '2021-03-03 00:00:00 +0000',
      updatedAt: '2021-03-03 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
  ];

  test('is rendered correctly to match the snapshot', () => {
    const wrapper = mount(<TopPage articles={testArticles} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('has proper style rules', () => {
    const wrapper = mount(<TopPage articles={testArticles} />);

    test('in ArticleListSection', () => {
      expect(wrapper.find('S-ArticleListSection')).toHaveStyleRule(
        'margin-bottom',
        '4rem'
      );
    });

    test('in CategoryListSection', () => {
      expect(wrapper.find('S-CategoryListSection')).toHaveStyleRule(
        'margin-bottom',
        '4rem'
      );
    });
  });
});
