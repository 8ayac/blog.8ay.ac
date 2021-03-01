import { BlogTitle } from '@/src/components/elements/BlogTitle';
import { theme } from '@/src/constants/theme';
import { mq } from '@/src/shared/styles/mediaQuery';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('BlogTitle', () => {
  const testTitle = 'Test Title';
  const testSubtitle = 'Test Subtitle';

  describe('is rendered correctly', () => {
    describe('to match the snapshot', () => {
      test('default', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <BlogTitle title={testTitle} subtitle={testSubtitle} />
          </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot();
      });

      test('when set linkToTopPage option to false', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <BlogTitle
              title={testTitle}
              subtitle={testSubtitle}
              linkToTopPage={false}
            />
          </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('under certain conditions', () => {
      test('title links to top page in default ', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <BlogTitle title={testTitle} subtitle={testSubtitle} />
          </ThemeProvider>
        );
        expect(wrapper.find('Link')).toHaveLength(1);
        expect(wrapper.find('Link').prop('href')).toBe('/');
      });

      test('title is just a text when set linkToTopPage option to false', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <BlogTitle
              title={testTitle}
              subtitle={testSubtitle}
              linkToTopPage={false}
            />
          </ThemeProvider>
        );
        expect(wrapper.find('Link')).toHaveLength(0);
      });
    });
  });

  describe('has proper style rules', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BlogTitle title={testTitle} subtitle={testSubtitle} />
      </ThemeProvider>
    );

    test('in LogoWrapperAnchor', () => {
      expect(wrapper.find('LogoWrapperAnchor')).toHaveStyleRule(
        'color',
        'inherit'
      );
      expect(wrapper.find('LogoWrapperAnchor')).toHaveStyleRule(
        'text-decoration',
        'none'
      );
      expect(wrapper.find('LogoWrapperAnchor')).toHaveStyleRule(
        'cursor',
        'pointer'
      );
      expect(wrapper.find('LogoWrapperAnchor')).toHaveStyleRule(
        'user-select',
        'none'
      );

      expect(wrapper.find('LogoWrapperAnchor')).toHaveStyleRule(
        'color',
        'inherit',
        { target: ':visited' }
      );
      expect(wrapper.find('LogoWrapperAnchor')).toHaveStyleRule(
        'color',
        theme.color.blogTitle.logoWrapperAnchor.textOnHover,
        { target: ':hover' }
      );
    });

    test('in TitleSpan', () => {
      expect(wrapper.find('TitleSpan')).toHaveStyleRule('font-size', '2.2rem');

      expect(wrapper.find('TitleSpan')).toHaveStyleRule('font-size', '1.8rem', {
        media: mq('sm'),
      });
    });

    test('in SubtitleSpan', () => {
      expect(wrapper.find('SubtitleSpan')).toHaveStyleRule(
        'margin-left',
        '0.5rem'
      );
      expect(wrapper.find('SubtitleSpan')).toHaveStyleRule(
        'font-size',
        '1.7rem'
      );

      expect(wrapper.find('SubtitleSpan')).toHaveStyleRule(
        'font-size',
        '1.5rem',
        { media: mq('sm') }
      );
    });
  });
});
