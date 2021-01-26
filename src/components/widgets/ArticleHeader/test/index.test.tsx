import { ArticleHeader } from '@/src/components/widgets/ArticleHeader';
import { theme } from '@/src/constants/theme';
import { Article } from '@/src/types';
import { mount } from 'enzyme';
import React from 'react';

describe('ArticleHeader', () => {
  const testArticleData: Article = {
    id: 'test-article',
    title: 'Test Title',
    publishedAt: '2000-01-01 00:00:00 +0900',
    updatedAt: '2000-02-02 00:00:00 +0900',
    tags: ['test-tag1', 'test-tag2', 'test-tag3'],
    body: `Test Body`,
  };

  describe('is rendered correctly', () => {
    test(' to match the snapshot', () => {
      const wrapper = mount(<ArticleHeader article={testArticleData} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('has proper style rules', () => {
    const wrapper = mount(<ArticleHeader article={testArticleData} />);

    test('in DateTimeWrapperDiv', () => {
      expect(wrapper.find('DateTimeWrapperDiv')).toHaveStyleRule(
        'align-items',
        'center'
      );
      expect(wrapper.find('DateTimeWrapperDiv')).toHaveStyleRule(
        'flex-flow',
        'row wrap'
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

    test('in CategoryListWrapperDiv', () => {
      expect(wrapper.find('CategoryListWrapperDiv')).toHaveStyleRule(
        'margin-top',
        '2rem'
      );
      expect(wrapper.find('CategoryListWrapperDiv')).toHaveStyleRule(
        'margin-bottom',
        '0.5rem'
      );
    });

    test('in FontAwesomeIcon', () => {
      expect(wrapper.find('FontAwesomeIcon')).toHaveStyleRule(
        'margin-right',
        '1rem'
      );
      expect(wrapper.find('FontAwesomeIcon')).toHaveStyleRule(
        'margin-left',
        '0.5rem'
      );
      expect(wrapper.find('FontAwesomeIcon')).toHaveStyleRule(
        'font-size',
        '1em'
      );
      expect(wrapper.find('FontAwesomeIcon')).toHaveStyleRule(
        'color',
        `${theme.color.text.primaryLight}`
      );
    });
  });
});
