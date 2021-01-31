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
    changeLogs: [
      {
        id: '0000001',
        date: new Date('2021-01-02T03:04:05.000Z'),
        description: ':test_prefix: this is a test commit 01',
        author: '8ayac',
      },
      {
        id: '0000002',
        date: new Date('2021-06-07T08:09:10.000Z'),
        description: ':test_prefix: this is a test commit 02',
        author: '8ayac',
      },
      {
        id: '0000003',
        date: new Date('2021-11-12T13:14:15.000Z'),
        description: ':test_prefix: this is a test commit 03',
        author: '8ayac',
      },
    ],
  };

  describe('is rendered correctly', () => {
    describe('to match the snapshot', () => {
      test('with revision history', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <ArticlePage article={testArticleData} />
          </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot();
      });

      test('without revision history', () => {
        const testArticleDataHasNoRevisionRecords = {
          ...testArticleData,
          changeLogs: [],
        };
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <ArticlePage article={testArticleDataHasNoRevisionRecords} />
          </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    test('to render revision history of the article', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <ArticlePage article={testArticleData} />
        </ThemeProvider>
      );
      expect(wrapper.find('RevisionHistoryWrapperDiv')).toHaveLength(1);
    });

    test('not render revision history of the article', () => {
      const testArticleDataHasNoRevisionRecords = {
        ...testArticleData,
        changeLogs: [],
      };
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <ArticlePage article={testArticleDataHasNoRevisionRecords} />
        </ThemeProvider>
      );
      expect(wrapper.find('RevisionHistoryWrapperDiv')).toHaveLength(0);
    });
  });

  describe('has proper style rules', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ArticlePage article={testArticleData} />
      </ThemeProvider>
    );

    test('in RevisionHistoryWrapperDiv', () => {
      expect(wrapper.find('RevisionHistoryWrapperDiv')).toHaveStyleRule(
        'padding',
        '1rem 0 0.7rem'
      );
      expect(wrapper.find('RevisionHistoryWrapperDiv')).toHaveStyleRule(
        'margin',
        '0 0 5rem'
      );
      expect(wrapper.find('RevisionHistoryWrapperDiv')).toHaveStyleRule(
        'border-color',
        `${theme.color.border.primaryLight}`
      );
      expect(wrapper.find('RevisionHistoryWrapperDiv')).toHaveStyleRule(
        'border-style',
        'dotted'
      );
      expect(wrapper.find('RevisionHistoryWrapperDiv')).toHaveStyleRule(
        'border-width',
        '2px 0'
      );
    });
  });
});
