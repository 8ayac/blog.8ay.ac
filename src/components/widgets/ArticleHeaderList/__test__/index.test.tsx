import { ArticleHeaderList } from '@/src/components/widgets/ArticleHeaderList';
import { Article } from '@/src/types';
import { mount, shallow } from 'enzyme';
import React from 'react';

describe('ArticleHeaderList', () => {
  const testArticles = [
    {
      id: 'test-article-01',
      title: 'Test Title 01',
      tags: ['test01'],
      publishedAt: '2021-01-01 00:00:00 +0000',
      updatedAt: '2021-01-01 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-02',
      title: 'Test Title 02',
      tags: ['test02'],
      publishedAt: '2021-02-02 00:00:00 +0000',
      updatedAt: '2021-02-02 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
    {
      id: 'test-article-03',
      title: 'Test Title 03',
      tags: ['test03'],
      publishedAt: '2021-03-03 00:00:00 +0000',
      updatedAt: '2021-03-03 00:00:00 +0000',
      body: 'bluhbluhbluh',
    },
  ];

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      const wrapper = mount(<ArticleHeaderList articles={testArticles} />);
      expect(wrapper).toMatchSnapshot();
    });

    test('to contain the correct ArticleHeader components', () => {
      const wrapper = shallow(<ArticleHeaderList articles={testArticles} />);

      expect(
        wrapper.find('ArticleHeaderWrapperDiv').find('ArticleHeader')
      ).toHaveLength(3);
      expect(
        (wrapper.find('ArticleHeader').at(0).prop('article') as Article).id
      ).toBe('test-article-01');
      expect(
        (wrapper.find('ArticleHeader').at(1).prop('article') as Article).id
      ).toBe('test-article-02');
      expect(
        (wrapper.find('ArticleHeader').at(2).prop('article') as Article).id
      ).toBe('test-article-03');
    });
  });

  describe('has proper style rules', () => {
    const wrapper = shallow(<ArticleHeaderList articles={testArticles} />);

    test('in ComponentWrapperDiv', () => {
      expect(wrapper.find('ComponentWrapperDiv')).toHaveStyleRule(
        'margin',
        '5rem auto 10rem'
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
