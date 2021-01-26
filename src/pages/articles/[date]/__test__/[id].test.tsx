import ArticlePage from '@/src/pages/articles/[date]/[id]';
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
});
