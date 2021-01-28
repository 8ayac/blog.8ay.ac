import { FootnoteDefinition } from '@/src/components/elements/MarkdownRenderer/CustomRenderers/FootnoteDefinition';
import { FOOTNOTE_REFERENCE_PREFIX } from '@/src/constants/footnote';
import { mount } from 'enzyme';
import React from 'react';

describe('FootnoteDefinition', () => {
  const testProps = {
    identifier: '1',
    label: '1',
  };
  const testChildren = <p>bluhbluhbluh</p>;
  const wrapper = mount(
    <FootnoteDefinition
      identifier={testProps.identifier}
      label={testProps.label}
    >
      {testChildren}
    </FootnoteDefinition>
  );

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('to be labeled properly', () => {
      expect(wrapper.find('LabelSpan').find('span').text()).toBe(
        `^${testProps.label}:`
      );
    });

    test('to be linked properly', () => {
      expect(wrapper.find('a').prop('href')).toBe(
        `#${FOOTNOTE_REFERENCE_PREFIX}1`
      );
    });

    test('to have proper children elements', () => {
      expect(wrapper.find('p')).toHaveLength(1);
      expect(wrapper.find('p').text()).toBe('bluhbluhbluh');
    });
  });

  describe('has proper style rules', () => {
    test('in FootnoteWrapperDiv', () => {
      expect(wrapper.find('FootnoteWrapperDiv')).toHaveStyleRule(
        'margin-bottom',
        '1rem!important'
      );

      expect(wrapper.find('FootnoteWrapperDiv')).toHaveStyleRule(
        'display',
        'inline',
        { target: '*' }
      );
      expect(wrapper.find('FootnoteWrapperDiv')).toHaveStyleRule(
        'font-size',
        '1.6rem',
        { target: '*' }
      );
    });

    test('in LabelSpan', () => {
      expect(wrapper.find('LabelSpan')).toHaveStyleRule('margin-right', '1rem');
      expect(wrapper.find('LabelSpan')).toHaveStyleRule('font-weight', '600');
    });

    test('in ReturnAnchor', () => {
      expect(wrapper.find('ReturnAnchor')).toHaveStyleRule(
        'margin',
        '0 0.2rem!important'
      );
    });
  });
});
