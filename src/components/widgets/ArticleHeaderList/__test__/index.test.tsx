import { ArticleHeaderList } from '@/src/components/widgets/ArticleHeaderList';
import { theme } from '@/src/constants/theme';
import { Article } from '@/src/types';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('ArticleHeaderList', () => {
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
    {
      id: 'test-article-03',
      title: 'Test Title 03',
      tags: ['test03'],
      publishedAt: new Date('2021-03-03T00:00:00.000Z'),
      updatedAt: new Date('2021-03-03T00:00:00.000Z'),
      body: 'bluhbluhbluh',
    },
  ];

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <ArticleHeaderList articles={testArticles} />
        </ThemeProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('to contain the correct ArticleHeader components', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <ArticleHeaderList articles={testArticles} />
        </ThemeProvider>
      );

      expect(
        wrapper.find('ArticleHeaderWrapperDiv').find('ArticleHeader')
      ).toHaveLength(3);
      expect(
        (wrapper.find('ArticleHeader').at(0).prop('article') as Article).id
      ).toBe('test-article-03');
      expect(
        (wrapper.find('ArticleHeader').at(1).prop('article') as Article).id
      ).toBe('test-article-02');
      expect(
        (wrapper.find('ArticleHeader').at(2).prop('article') as Article).id
      ).toBe('test-article-01');
    });
  });

  describe('has proper style rules', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ArticleHeaderList articles={testArticles} />
      </ThemeProvider>
    );

    test('in ComponentWrapperDiv', () => {
      expect(wrapper.find('ComponentWrapperDiv')).toHaveStyleRule(
        'margin',
        '0 auto'
      );

      expect(wrapper.find('ComponentWrapperDiv')).toHaveStyleRule(
        'display',
        'grid'
      );

      expect(wrapper.find('ComponentWrapperDiv')).toHaveStyleRule(
        'grid-gap',
        '5%'
      );
    });

    test('in ArticleHeaderWrapperDiv', () => {
      expect(
        wrapper.find('ArticleHeaderWrapperDiv')
      ).toHaveStyleRule('font-size', '2.3rem', { target: 'h1' });
    });
  });
});
