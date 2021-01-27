import CategoryPage from '@/src/pages/category/[name]';
import { mount, shallow } from 'enzyme';
import React from 'react';

describe('CategoryPage', () => {
  const testCategoryName = 'test-cat';
  const testArticles = [
    {
      id: 'test-article-01',
      title: 'Test Title 01',
      tags: [testCategoryName],
      publishedAt: '2021-01-01 00:00:00 +0000',
      updatedAt: '2021-01-01 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-02',
      title: 'Test Title 02',
      tags: [testCategoryName],
      publishedAt: '2021-02-02 00:00:00 +0000',
      updatedAt: '2021-02-02 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-03',
      title: 'Test Title 03',
      tags: [testCategoryName],
      publishedAt: '2021-03-03 00:00:00 +0000',
      updatedAt: '2021-03-03 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
  ];

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      const wrapper = shallow(
        <CategoryPage name={testCategoryName} filteredArticles={testArticles} />
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('title header of the page', () => {
      const wrapper = mount(
        <CategoryPage name={testCategoryName} filteredArticles={testArticles} />
      );
      expect(wrapper.find('BodyHeader').first().text()).toBe(
        `Tag: ${testCategoryName}`
      );
    });
  });

  describe('has proper style rules', () => {
    const wrapper = shallow(
      <CategoryPage name={testCategoryName} filteredArticles={testArticles} />
    );

    test('in ArticleListWrapperDiv', () => {
      expect(wrapper.find('ArticleListWrapperDiv')).toHaveStyleRule(
        'max-width',
        '90%'
      );
      expect(wrapper.find('ArticleListWrapperDiv')).toHaveStyleRule(
        'margin',
        '0 auto'
      );
    });
  });
});
