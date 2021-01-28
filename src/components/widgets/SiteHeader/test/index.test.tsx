import { SiteHeader } from '@/src/components/widgets/SiteHeader';
import { theme } from '@/src/constants/theme';
import { mount } from 'enzyme';
import React from 'react';

describe('Header', () => {
  const wrapper = mount(<SiteHeader />);

  it('is rendered correctly to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('has proper style rules', () => {
    test('in SiteHeader', () => {
      const wHeader = wrapper.find('Header');

      expect(wHeader).toHaveStyleRule('position', 'sticky');
      expect(wHeader).toHaveStyleRule('top', '0');
      expect(wHeader).toHaveStyleRule('z-index', '100');
      expect(wHeader).toHaveStyleRule('height', '3.7rem');
      expect(wHeader).toHaveStyleRule('padding', '0.5rem 1rem');
      expect(wHeader).toHaveStyleRule(
        'background-color',
        theme.color.green.dark2
      );
      expect(wHeader).toHaveStyleRule(
        'border-bottom',
        `1px solid ${theme.color.green.light}`
      );
    });

    test('in HeaderInner', () => {
      const wHeaderInner = wrapper.find('HeaderInner');

      expect(wHeaderInner).toHaveStyleRule('display', 'flex');
      expect(wHeaderInner).toHaveStyleRule('align-items', 'center');
      expect(wHeaderInner).toHaveStyleRule('justify-content', 'space-between');
      expect(wHeaderInner).toHaveStyleRule('height', '100%');
      expect(wHeaderInner).toHaveStyleRule('color', 'white');
    });

    test('in TitleWrapper', () => {
      const wTitleWrapper = wrapper.find('TitleWrapper');

      expect(wTitleWrapper).toHaveStyleRule('display', 'flex');
      expect(wTitleWrapper).toHaveStyleRule('align-items', 'center');
      expect(wTitleWrapper).toHaveStyleRule(
        'filter',
        `drop-shadow(2px 2px 1px ${theme.color.green.dark3})`
      );
    });

    test('in NavWrapper', () => {
      const wNavWrapper = wrapper.find('NavWrapper');

      expect(wNavWrapper).toHaveStyleRule('display', 'flex');
      expect(wNavWrapper).toHaveStyleRule('align-items', 'center');
      expect(wNavWrapper).toHaveStyleRule(
        'filter',
        `drop-shadow(2px 2px 1px ${theme.color.green.dark3})`
      );
    });
  });
});
