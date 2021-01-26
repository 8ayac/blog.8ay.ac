import { MarkdownRender } from '@/src/components/elements/MarkdownRenderer';
import { mount } from 'enzyme';
import React from 'react';

describe('MarkdownRender', () => {
  test('is rendered correctly to match the snapshot', () => {
    // It is not responsible for me to test whether the Markdown content is properly converted to HTML.
    // So, here I test only that the style rules applied to generated HTML will not be changed unintentionally, using a snapshot.
    const wrapper = mount(<MarkdownRender content="test" />);
    expect(wrapper).toMatchSnapshot();
  });
});