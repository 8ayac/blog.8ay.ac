import TagsPage from '@/src/pages/tags/[name]';
import { mount } from 'enzyme';
import React from 'react';

describe('TagPage', () => {
  const testTagName = 'test-cat';
  const testArticles = [
    {
      id: 'test-article-01',
      title: 'Test Title 01',
      tags: [testTagName],
      publishedAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-01-01T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-02',
      title: 'Test Title 02',
      tags: [testTagName],
      publishedAt: new Date('2021-02-02T00:00:00.000Z'),
      updatedAt: new Date('2021-02-02T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-03',
      title: 'Test Title 03',
      tags: [testTagName],
      publishedAt: new Date('2021-03-03T00:00:00.000Z'),
      updatedAt: new Date('2021-03-03T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    },
  ];

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      const wrapper = mount(
        <TagsPage name={testTagName} filteredArticles={testArticles} />
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('title header of the page', () => {
      const wrapper = mount(
        <TagsPage name={testTagName} filteredArticles={testArticles} />
      );
      expect(wrapper.find('BodyHeader').first().text()).toBe(
        `Tag: ${testTagName}`
      );
    });
  });
});
