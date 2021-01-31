import { BasicLayout } from '@/src/components/layouts/BasicLayout';
import { theme } from '@/src/constants/theme';
import { ThemeProvider } from '@emotion/react';
import { mount, shallow } from 'enzyme';
import React from 'react';

describe('BasicLayout', () => {
  test('is rendered correctly to match the snapshot', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BasicLayout>
          <b>children</b>
        </BasicLayout>
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('renders proper children', () => {
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <BasicLayout>
          <h1>THIS IS A TEST</h1>
        </BasicLayout>
      </ThemeProvider>
    );
    expect(wrapper.find('BasicLayout').find('h1').text()).toBe(
      'THIS IS A TEST'
    );
  });

  describe('has proper style rules', () => {
    test('in ContentWrapperDiv', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <BasicLayout>
            <h1>THIS IS A TEST</h1>
          </BasicLayout>
        </ThemeProvider>
      );
      const wContentWrapperDiv = wrapper.find('ContentWrapperDiv');

      expect(wContentWrapperDiv).toHaveStyleRule('max-width', '1000px');
      expect(wContentWrapperDiv).toHaveStyleRule('padding', '3rem 10%');
      expect(wContentWrapperDiv).toHaveStyleRule('margin', '3rem auto');
      expect(wContentWrapperDiv).toHaveStyleRule('font-size', '1.6rem');
      expect(wContentWrapperDiv).toHaveStyleRule('word-break', 'break-word');
      expect(wContentWrapperDiv).toHaveStyleRule('background-color', 'white');
      expect(wContentWrapperDiv).toHaveStyleRule('border-radius', '5px');

      expect(wContentWrapperDiv).toHaveStyleRule('max-width', '100%', {
        target: 'img',
      });
    });
  });
});
