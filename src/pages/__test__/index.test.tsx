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
      publishedAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-02',
      title: 'Test Title 02',
      tags: testCategories.slice(0, 2),
      publishedAt: new Date('2021-02-02T00:00:00.000Z'),
      updatedAt: new Date('2021-02-02T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-03',
      title: 'Test Title 03',
      tags: testCategories.slice(0, 1),
      publishedAt: new Date('2021-03-03T00:00:00.000Z'),
      updatedAt: new Date('2021-03-03T00:00:00.000Z'),
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

    test('in TagListSection', () => {
      expect(wrapper.find('S-TagListSection')).toHaveStyleRule(
        'margin-bottom',
        '4rem'
      );
    });
  });
});
