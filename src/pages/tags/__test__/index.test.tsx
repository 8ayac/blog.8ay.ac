import { theme } from '@/src/constants/theme';
import TagsIndexPage from '@/src/pages/tags';
import { mockArticleData } from '@/src/shared/__mocks__/articleData';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('TagsIndexPage', () => {
  const testCategories = ['test-custom-tag-1', 'test-custom-tag-2'];
  const testArticles = [
    {
      ...mockArticleData.t1,
      attributes: {
        ...mockArticleData.t1.attributes,
        tags: testCategories,
      },
    },
    {
      ...mockArticleData.t2,
      attributes: {
        ...mockArticleData.t2.attributes,
        tags: testCategories.slice(0, 1),
      },
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
        testCategories[0]
      );
      expect(wrapper.find('S-EachTagSection').at(1).prop('id')).toBe(
        testCategories[1]
      );
    });

    test('title of each tag section header are correct', () => {
      expect(
        wrapper
          .find('S-EachTagSection')
          .at(0)
          .find('BodyHeader')
          .first()
          .prop('title')
      ).toBe('test-custom-tag-1 (2)');

      expect(
        wrapper
          .find('S-EachTagSection')
          .at(1)
          .find('BodyHeader')
          .first()
          .prop('title')
      ).toBe('test-custom-tag-2 (1)');
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
      ).toBe(`/tags/${testCategories[0]}`);
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
