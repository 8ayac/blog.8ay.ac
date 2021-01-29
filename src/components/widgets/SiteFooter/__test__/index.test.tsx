import { SiteFooter } from '@/src/components/widgets/SiteFooter';
import { theme } from '@/src/constants/theme';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('SiteFooter', () => {
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <SiteFooter />
    </ThemeProvider>
  );
  it('is rendered correctly to match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('has proper style rules', () => {
    test('in Footer', () => {
      expect(wrapper.find('Footer')).toHaveStyleRule('padding', '3rem 0');
      expect(wrapper.find('Footer')).toHaveStyleRule('margin-top', '10rem');
      expect(wrapper.find('Footer')).toHaveStyleRule('font-size', '1.5rem');
      expect(wrapper.find('Footer')).toHaveStyleRule('text-align', 'center');
    });

    test.skip('in CopyRightParagraph', () => null);

    test('in AboutGAParagraph', () => {
      expect(wrapper.find('AboutGAParagraph')).toHaveStyleRule(
        'color',
        theme.color.text.primaryLight
      );
    });
  });
});
