import { BlogTitle } from '@/src/components/elements/BlogTitle';
import { shallow } from 'enzyme';
import React from 'react';

describe('BlogTitle', () => {
  const testTitle = 'Test Title';
  const testSubtitle = 'Test Subtitle';

  const wrapper = shallow(
    <BlogTitle title={testTitle} subtitle={testSubtitle} />
  );

  test('rendered correctly to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('has proper style rules', () => {
    test('in ComponentWrapperDiv', () => {
      expect(wrapper.find('ComponentWrapperDiv')).toHaveStyleRule(
        'user-select',
        'none'
      );
    });

    test('in TitleSpan', () => {
      expect(wrapper.find('TitleSpan')).toHaveStyleRule('font-size', '2.2rem');
    });

    test('in SubtitleSpan', () => {
      expect(wrapper.find('SubtitleSpan')).toHaveStyleRule(
        'margin-left',
        '0.5rem'
      );

      expect(wrapper.find('SubtitleSpan')).toHaveStyleRule(
        'font-size',
        '1.4rem'
      );
    });
  });
});
