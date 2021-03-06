import { ArticleShareButtons } from '@/src/components/widgets/ArticleShareButtons';
import { theme } from '@/src/constants/theme';
import { mockArticleData } from '@/src/shared/__mocks__/articleData';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('ArticleShareButtons', () => {
  const testArticleData = mockArticleData.t1;

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <ArticleShareButtons article={testArticleData} />
        </ThemeProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('to contain correct set of share buttons', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <ArticleShareButtons article={testArticleData} />
        </ThemeProvider>
      );
      const expectNames = [
        'Facebook',
        'Hatena',
        'Line',
        'Pocket',
        'Reddit',
        'Twitter',
      ];
      expectNames.forEach((name) => {
        expect(wrapper.find(name)).toHaveLength(1);
      });
    });

    describe('under certain conditions', () => {
      test('when size prop is not given (default)', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <ArticleShareButtons article={testArticleData} />
          </ThemeProvider>
        );
        expect(
          wrapper.find('ButtonWrapperDiv').first().find('Icon').prop('size')
        ).toBe(32);
      });

      test('when size=64', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <ArticleShareButtons article={testArticleData} size={64} />
          </ThemeProvider>
        );
        expect(
          wrapper.find('ButtonWrapperDiv').first().find('Icon').prop('size')
        ).toBe(64);
      });
    });
  });

  describe('has proper style rules', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ArticleShareButtons article={testArticleData} />
      </ThemeProvider>
    );

    test('in ButtonListWrapperFlexDiv', () => {
      expect(wrapper.find('ButtonListWrapperFlexDiv')).toHaveStyleRule(
        'display',
        'flex'
      );
    });

    test('in ButtonWrapperDiv', () => {
      const expectedShadowColor =
        theme.color.articleShareButtons.buttonWrapperDiv.shadow;

      expect(wrapper.find('ButtonWrapperDiv').first()).toHaveStyleRule(
        'margin-right',
        '1rem'
      );
      expect(wrapper.find('ButtonWrapperDiv').first()).toHaveStyleRule(
        'margin-bottom',
        '0.5rem'
      );
      expect(wrapper.find('ButtonWrapperDiv').first()).toHaveStyleRule(
        'filter',
        new RegExp(
          `drop-shadow\\((\\r?\\n)?(\\s+)2px 2px 1px(\\s+)${expectedShadowColor.replace(
            /[()]/g,
            '\\$&'
          )}(\\r?\\n)?(\\s+)\\)`
        )
      );

      expect(wrapper.find('ButtonWrapperDiv').first()).toHaveStyleRule(
        'filter',
        'brightness(120%)',
        { target: ':hover' }
      );
    });
  });
});
