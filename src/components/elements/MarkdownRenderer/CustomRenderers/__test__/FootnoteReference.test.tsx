import { FootnoteReference } from '@/src/components/elements/MarkdownRenderer/CustomRenderers/FootnoteReference';
import {
  FOOTNOTE_DEFINITION_PREFIX,
  FOOTNOTE_REFERENCE_PREFIX,
} from '@/src/constants/footnote';
import { mount } from 'enzyme';
import React from 'react';

describe('FootnoteReference', () => {
  const testProps = {
    identifier: '1',
    label: '1',
  };
  const wrapper = mount(
    <FootnoteReference
      identifier={testProps.identifier}
      label={testProps.label}
    />
  );

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    test('to be linked properly', () => {
      expect(wrapper.find('a').prop('href')).toBe(
        `#${FOOTNOTE_DEFINITION_PREFIX}1`
      );
    });

    test('to be specified proper id attribute', () => {
      expect(wrapper.find('sup').prop('id')).toBe(
        `${FOOTNOTE_REFERENCE_PREFIX}1`
      );
    });
  });

  describe('has proper style rules', () => {
    test('in IdentifierSup', () => {
      expect(wrapper.find('IdentifierSup').find('sup')).toHaveStyleRule(
        'margin',
        '0.2rem'
      );
    });
  });
});
