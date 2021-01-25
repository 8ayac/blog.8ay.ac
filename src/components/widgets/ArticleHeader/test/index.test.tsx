import { ArticleHeader } from '@/src/components/widgets/ArticleHeader';
import { theme } from '@/src/constants/theme';
import { Article } from '@/src/types';
import { shallow } from 'enzyme';
import React from 'react';

describe('ArticleHeader', () => {
  const testArticleData: Article = {
    title: 'Test Title',
    publishedAt: new Date('2000-01-01 00:00:00 +0900'),
    updatedAt: new Date('2000-02-02 00:00:00 +0900'),
    tags: ['test-tag1', 'test-tag2', 'test-tag3'],
    body: `Test Body`,
  };

  describe('is rendered correctly', () => {
    test(' to match the snapshot', () => {
      const wrapper = shallow(<ArticleHeader article={testArticleData} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('has proper style rules', () => {
    const wrapper = shallow(<ArticleHeader article={testArticleData} />);

    test('in WrapperHeader', () => {
      expect(wrapper.find('WrapperHeader')).toHaveStyleRule(
        'border-bottom',
        `0.25rem solid ${theme.color.border.primaryLight}`
      );
      expect(wrapper.find('WrapperHeader')).toHaveStyleRule(
        'margin-bottom',
        '3rem'
      );
    });

    test('in ArticleTitleH1', () => {
      expect(wrapper.find('ArticleTitleH1')).toHaveStyleRule(
        'font-size',
        '2.16em'
      );
      expect(wrapper.find('ArticleTitleH1')).toHaveStyleRule(
        'margin',
        '0 0 1rem'
      );
    });

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
        '0.3rem',
        {
          target: '*',
        }
      );
      expect(wrapper.find('DateTimeWrapperDiv')).toHaveStyleRule(
        'margin-right',
        '1rem',
        {
          target: '*',
        }
      );
    });
  });
});
