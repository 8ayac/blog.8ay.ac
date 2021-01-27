import { BlogTitle } from '@/src/components/elements/BlogTitle';
import { theme } from '@/src/constants/theme';
import { mount, shallow } from 'enzyme';
import React from 'react';

describe('BlogTitle', () => {
  const testTitle = 'Test Title';
  const testSubtitle = 'Test Subtitle';

  describe('is rendered correctly', () => {
    describe('to match the snapshot', () => {
      test('default', () => {
        const wrapper = mount(
          <BlogTitle title={testTitle} subtitle={testSubtitle} />
        );
        expect(wrapper).toMatchSnapshot();
      });

      test('when set linkToTopPage option to false', () => {
        const wrapper = mount(
          <BlogTitle
            title={testTitle}
            subtitle={testSubtitle}
            linkToTopPage={false}
          />
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('under certain conditions', () => {
      test('title links to top page in default ', () => {
        const wrapper = shallow(
          <BlogTitle title={testTitle} subtitle={testSubtitle} />
        );
        expect(wrapper.find('Link')).toHaveLength(1);
        expect(wrapper.find('Link').prop('href')).toBe('/');
      });

      test('title is just a text when set linkToTopPage option to false', () => {
        const wrapper = shallow(
          <BlogTitle
            title={testTitle}
            subtitle={testSubtitle}
            linkToTopPage={false}
          />
        );
        expect(wrapper.find('Link')).toHaveLength(0);
      });
    });
  });

  describe('has proper style rules', () => {
    const wrapper = shallow(
      <BlogTitle title={testTitle} subtitle={testSubtitle} />
    );

    test('in ComponentWrapperDiv', () => {
      expect(wrapper.find('ComponentWrapperDiv')).toHaveStyleRule(
        'cursor',
        'pointer'
      );
      expect(wrapper.find('ComponentWrapperDiv')).toHaveStyleRule(
        'user-select',
        'none'
      );

      expect(wrapper.find('ComponentWrapperDiv')).toHaveStyleRule(
        'color',
        `${theme.color.yellow.base}`,
        { target: ':hover' }
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
