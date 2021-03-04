import { CodeBlock } from '@/src/components/elements/MarkdownRenderer/CustomRenderers/CodeBlock';
import { mount } from 'enzyme';
import React from 'react';

describe('CodeBlock', () => {
  const testLanguage = 'js';
  const testCodeStr = 'console.log(1);';

  const wrapper = mount(
    <CodeBlock language={testLanguage} value={testCodeStr} />
  );

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  test('intended custom style rules are applied correctly', () => {
    const expectCustomStyle = {
      padding: '1.5rem 2rem',
      borderRadius: '5px',
      fontFamily: 'monospace',
      lineHeight: '1.1',
    };
    expect(wrapper.find('pre').first().prop('style')).toMatchObject(
      expectCustomStyle
    );
  });
});
