import ArticlePage, { S } from '@/src/pages/articles/[date]/[id]';
import { shallow } from 'enzyme';
import React from 'react';

describe('ArticlePage', () => {
  const testArticleData = {
    id: 'example-id',
    title: 'Example01',
    publishedAt: '2021-01-02 03:04:56 +0900',
    updatedAt: '2021-01-02 03:04:56 +0900',
    body: '## test\r\n\r\nbluhbluhbluh',
  };
  const wrapper = shallow(<ArticlePage article={testArticleData} />);

  it('is rendered correctly to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('has proper style rules', () => {
    expect(wrapper.find('ArticleWrapperDiv')).toHaveStyleRule(
      'font-size',
      '1.6rem'
    );
    expect(wrapper.find('ArticleWrapperDiv')).toHaveStyleRule(
      'word-break',
      'break-all'
    );
  });
});

describe('Styled component used in ArticlePage', () => {
  describe('to match the snapshot', () => {
    test('S.ArticleWrapperDiv', () => {
      const wrapper = shallow(<S.ArticleWrapperDiv />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
