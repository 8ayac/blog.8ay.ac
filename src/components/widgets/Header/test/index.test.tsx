import { Header } from '@/src/components/widgets/Header';
import { theme } from '@/src/constants/theme';
import { shallow } from 'enzyme';
import React from 'react';

describe('Header', () => {
  const wrapper = shallow(<Header />);

  it('is rendered correctly to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('has proper style rules', () => {
    test('in Header', () => {
      const wHeader = wrapper.find('Header');

      expect(wHeader).toHaveStyleRule('padding', '0.5rem 1rem');
      expect(wHeader).toHaveStyleRule(
        'background-color',
        theme.color.green.dark2
      );
      expect(wHeader).toHaveStyleRule('position', 'sticky');
      expect(wHeader).toHaveStyleRule('top', '0');
      expect(wHeader).toHaveStyleRule(
        'border-bottom',
        `1px solid ${theme.color.green.light}`
      );
      expect(wHeader).toHaveStyleRule('height', '3.7rem');
    });

    test('in HeaderInner', () => {
      const wHeaderInner = wrapper.find('HeaderInner');

      expect(wHeaderInner).toHaveStyleRule('height', '100%');
      expect(wHeaderInner).toHaveStyleRule('color', 'white');
      expect(wHeaderInner).toHaveStyleRule('display', 'flex');
      expect(wHeaderInner).toHaveStyleRule('align-items', 'center');
      expect(wHeaderInner).toHaveStyleRule('justify-content', 'space-between');
    });

    test('in TitleWrapper', () => {
      const wTitleWrapper = wrapper.find('TitleWrapper');

      expect(wTitleWrapper).toHaveStyleRule('display', 'flex');
      expect(wTitleWrapper).toHaveStyleRule('align-items', 'center');
    });

    test('in NavWrapper', () => {
      const wNavWrapper = wrapper.find('NavWrapper');

      expect(wNavWrapper).toHaveStyleRule('display', 'flex');
      expect(wNavWrapper).toHaveStyleRule('align-items', 'center');
    });
  });
});
