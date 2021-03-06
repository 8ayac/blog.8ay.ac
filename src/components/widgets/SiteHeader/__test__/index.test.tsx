import { SiteHeader } from '@/src/components/widgets/SiteHeader';
import { theme } from '@/src/constants/theme';
import { mq } from '@/src/shared/styles/mediaQuery';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('Header', () => {
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <SiteHeader />
    </ThemeProvider>
  );

  it('is rendered correctly to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('has proper style rules', () => {
    test('in SiteHeader', () => {
      const wHeader = wrapper.find('Header');
      const expectedShadowColor = theme.color.siteHeader.header.shadow;

      expect(wHeader).toHaveStyleRule('position', 'sticky');
      expect(wHeader).toHaveStyleRule('top', '0');
      expect(wHeader).toHaveStyleRule('z-index', '100');

      expect(wHeader).toHaveStyleRule('display', 'flex');
      expect(wHeader).toHaveStyleRule('align-items', 'center');

      expect(wHeader).toHaveStyleRule('min-height', '5rem');
      expect(wHeader).toHaveStyleRule('padding', '0.5rem 1.5rem');

      expect(wHeader).toHaveStyleRule(
        'background-color',
        theme.color.siteHeader.header.bg
      );
      expect(wHeader).toHaveStyleRule(
        'filter',
        new RegExp(
          `drop-shadow\\((\\r?\\n)?(\\s+)0 0 2px(\\s+)${expectedShadowColor.replace(
            /[()]/g,
            '\\$&'
          )}(\\r?\\n)?(\\s+)\\)`
        )
      );
      expect(wHeader).toHaveStyleRule('opacity', '0.9');

      expect(wHeader).toHaveStyleRule('min-height', '3.5rem', {
        media: mq('sm'),
      });
    });

    test('in HeaderInner', () => {
      const wHeaderInner = wrapper.find('HeaderInner');

      expect(wHeaderInner).toHaveStyleRule('display', 'flex');
      expect(wHeaderInner).toHaveStyleRule('justify-content', 'space-between');
      expect(wHeaderInner).toHaveStyleRule('width', '100%');
      expect(wHeaderInner).toHaveStyleRule('color', 'white');
    });

    test('in TitleWrapper', () => {
      const wTitleWrapper = wrapper.find('S-TitleWrapper');
      const expectedShadowColor =
        theme.color.siteHeader.innerWrapperFlexContainerDiv.shadow;

      expect(wTitleWrapper).toHaveStyleRule('display', 'flex');
      expect(wTitleWrapper).toHaveStyleRule('align-items', 'center');
      expect(wTitleWrapper).toHaveStyleRule(
        'filter',
        new RegExp(
          `drop-shadow\\((\\r?\\n)?(\\s+)2px 2px 1px(\\s+)${expectedShadowColor.replace(
            /[()]/g,
            '\\$&'
          )}(\\r?\\n)?(\\s+)\\)`
        )
      );
      expect(wTitleWrapper).toHaveStyleRule('opacity', '1');
    });

    test('in NavWrapper', () => {
      const wNavWrapper = wrapper.find('S-NavWrapper');
      const expectedShadowColor =
        theme.color.siteHeader.innerWrapperFlexContainerDiv.shadow;

      expect(wNavWrapper).toHaveStyleRule('display', 'flex');
      expect(wNavWrapper).toHaveStyleRule(
        'filter',
        new RegExp(
          `drop-shadow\\((\\r?\\n)?(\\s+)2px 2px 1px(\\s+)${expectedShadowColor.replace(
            /[()]/g,
            '\\$&'
          )}(\\r?\\n)?(\\s+)\\)`
        )
      );
      expect(wNavWrapper).toHaveStyleRule('opacity', '1');

      expect(wNavWrapper).toHaveStyleRule('gap', '1rem');
      expect(wNavWrapper).toHaveStyleRule('gap', '0', { media: mq('sm') });
    });
  });
});
