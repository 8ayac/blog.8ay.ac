import { config } from '@/site.config';
import { ArticleOGPMeta } from '@/src/components/elements/ArticleOGPMeta';
import { Article, ArticleAttributes } from '@/src/types';
import { mount } from 'enzyme';
import React from 'react';

describe('ArticleOGPMeta', () => {
  const testArticleData: Article = {
    attributes: {
      id: 'example-id',
      title: 'Example01',
      publishedAt: new Date('2021-01-01T00:00:00.000Z'),
      updatedAt: new Date('2021-04-04T00:00:00.000Z'),
      tags: ['cat-1', 'cat-2', 'cat-3'],
    } as ArticleAttributes,
    body: '## test\r\n\r\nbluhbluhbluh',
    changeLogs: [
      {
        id: '0000001',
        date: new Date('2021-02-02T00:00:00.000Z'),
        description: ':test_prefix: this is a test commit 01',
        author: '8ayac',
      },
      {
        id: '0000002',
        date: new Date('2021-03-03T00:00:00.000Z'),
        description: ':test_prefix: this is a test commit 02',
        author: '8ayac',
      },
      {
        id: '0000003',
        date: new Date('2021-04-04T00:00:00.000Z'),
        description: ':test_prefix: this is a test commit 03',
        author: '8ayac',
      },
    ],
  };

  test('is rendered correctly to match the snapshot', () => {
    const wrapper = mount(<ArticleOGPMeta article={testArticleData} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('has correct metadata', () => {
    const wrapper = mount(<ArticleOGPMeta article={testArticleData} />);

    test('article:published_time', () => {
      expect(
        wrapper.find('meta[property="article:published_time"]').prop('content')
      ).toBe('2021-01-01T00:00:00.000Z');
    });

    test('article:modified_time', () => {
      expect(
        wrapper.find('meta[property="article:modified_time"]').prop('content')
      ).toBe('2021-04-04T00:00:00.000Z');
    });

    test('article:author', () => {
      expect(
        wrapper.find('meta[property="article:author"]').prop('content')
      ).toBe(config.site.maintainer);
    });

    test('article:tag', () => {
      expect(
        wrapper.find('meta[property="article:tag"]').at(0).prop('content')
      ).toBe('cat-1');
      expect(
        wrapper.find('meta[property="article:tag"]').at(1).prop('content')
      ).toBe('cat-2');
      expect(
        wrapper.find('meta[property="article:tag"]').at(2).prop('content')
      ).toBe('cat-3');
    });
  });

  test('modified_time equals published_time when change log is empty', () => {
    const wrapper = mount(
      <ArticleOGPMeta article={{ ...testArticleData, changeLogs: [] }} />
    );

    const modifiedTime = wrapper
      .find('meta[property="article:modified_time"]')
      .prop('content');
    const publishedTime = wrapper
      .find('meta[property="article:published_time"]')
      .prop('content');

    expect(modifiedTime).toEqual(publishedTime);
  });
});
