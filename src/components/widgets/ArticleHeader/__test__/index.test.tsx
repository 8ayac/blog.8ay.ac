import { ArticleHeader } from '@/src/components/widgets/ArticleHeader';
import { theme } from '@/src/constants/theme';
import { Article } from '@/src/types';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('ArticleHeader', () => {
  const testArticleData: Article = {
    attributes: {
      id: 'test-article',
      title: 'Test Title',
      publishedAt: new Date('2000-01-01T00:00:00.000Z'),
      tags: ['test-tag1', 'test-tag2', 'test-tag3'],
    },
    body: `Test Body`,
  };

  describe('is rendered correctly', () => {
    test(' to match the snapshot', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <ArticleHeader article={testArticleData} />
        </ThemeProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('have proper link title', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <ArticleHeader article={testArticleData} />
        </ThemeProvider>
      );

      expect(wrapper.find('a').first().prop('href')).toBe(
        `/articles/2000-01-01/test-article`
      );
    });
  });

  describe('has proper style rules', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ArticleHeader article={testArticleData} />
      </ThemeProvider>
    );

    test('in DateTimeWrapperDiv', () => {
      expect(wrapper.find('DateTimeWrapperDiv')).toHaveStyleRule(
        'display',
        'flex'
      );
      expect(wrapper.find('DateTimeWrapperDiv')).toHaveStyleRule(
        'flex-flow',
        'row wrap'
      );
      expect(wrapper.find('DateTimeWrapperDiv')).toHaveStyleRule(
        'align-items',
        'center'
      );
      expect(wrapper.find('DateTimeWrapperDiv')).toHaveStyleRule(
        'margin-bottom',
        '1rem'
      );

      expect(wrapper.find('DateTimeWrapperDiv')).toHaveStyleRule(
        'margin-right',
        '1rem',
        {
          target: '*',
        }
      );
    });

    test('in TagListWrapperDiv', () => {
      expect(wrapper.find('TagListWrapperDiv')).toHaveStyleRule(
        'margin-top',
        '2rem'
      );
      expect(wrapper.find('TagListWrapperDiv')).toHaveStyleRule(
        'margin-bottom',
        '0.5rem'
      );
    });
  });
});
