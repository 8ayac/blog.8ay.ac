import { theme } from '@/src/constants/theme';
import TagsIndexPage from '@/src/pages/tags';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('TagsIndexPage', () => {
  const testCategories = ['test-cat01', 'test-cat02', 'test-cat03'];
  const testArticles = [
    {
      attributes: {
        id: 'test-article-01',
        title: 'Test Title 01',
        tags: testCategories.slice(0, 3),
        publishedAt: new Date('2021-01-01T00:00:00.000Z'),
      },
      body: 'bluhbluhbluh',
    },
    {
      attributes: {
        id: 'test-article-02',
        title: 'Test Title 02',
        tags: testCategories.slice(0, 2),
        publishedAt: new Date('2021-02-02T00:00:00.000Z'),
      },
      body: 'bluhbluhbluh',
    },
    {
      attributes: {
        id: 'test-article-03',
        title: 'Test Title 03',
        tags: testCategories.slice(0, 1),
        publishedAt: new Date('2021-03-03T00:00:00.000Z'),
      },
      body: 'bluhbluhbluh',
    },
  ];

  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <TagsIndexPage
        tags={[
          ...new Set(
            testArticles.map((article) => article.attributes.tags).flat()
          ),
        ].sort()}
        articles={testArticles}
      />
    </ThemeProvider>
  );

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('title header of the page', () => {
      expect(wrapper.find('BodyHeader').first().text()).toBe(`Tags`);
    });

    test('id attributes are properly specified', () => {
      expect(wrapper.find('S-EachTagSection').at(0).prop('id')).toBe(
        'test-cat01'
      );
      expect(wrapper.find('S-EachTagSection').at(1).prop('id')).toBe(
        'test-cat02'
      );
      expect(wrapper.find('S-EachTagSection').at(2).prop('id')).toBe(
        'test-cat03'
      );
    });

    test('title of each tag section header are correct', () => {
      expect(
        wrapper
          .find('S-EachTagSection')
          .first()
          .find('BodyHeader')
          .first()
          .prop('title')
      ).toBe('test-cat01 (3)');
    });

    test('link destinations of each tag section title are correct', () => {
      expect(
        wrapper
          .find('S-EachTagSection')
          .first()
          .find('h1')
          .first()
          .find('a')
          .prop('href')
      ).toBe('/tags/test-cat01');
    });
  });

  describe('has proper style rules', () => {
    describe('in TagListSection', () => {
      expect(wrapper.find('S-TagListSection')).toHaveStyleRule(
        'margin-bottom',
        '7.5rem' // overwrote the value specified in S.Section component.
      );
      expect(wrapper.find('S-TagListSection')).toHaveStyleRule(
        'font-size',
        '1.25em'
      );
    });

    describe('in EachTagSection', () => {
      expect(wrapper.find('S-EachTagSection')).toHaveStyleRule(
        'margin-bottom',
        '3rem' // inherited from S.Section component.
      );
    });
  });
});
