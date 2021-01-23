import { BasicLayout } from '@/src/components/layouts/BasicLayout';
import { shallow } from 'enzyme';
import React from 'react';

describe('BasicLayout', () => {
  const wrapper = shallow(<BasicLayout />);

  test('is rendered correctly to match the snapshot', () => {
    wrapper.setProps({ children: '<b>children</b>' });
    expect(wrapper).toMatchSnapshot();
  });

  test('renders proper children', () => {
    wrapper.setProps({ children: '<h1>THIS IS A TEST</h1>' });
    expect(wrapper.find('ContentWrapperDiv').children().first().text()).toBe(
      '<h1>THIS IS A TEST</h1>'
    );
  });

  describe('has proper style rules', () => {
    test('in ContentWrapperDiv', () => {
      const wContentWrapperDiv = wrapper.find('ContentWrapperDiv');

      expect(wContentWrapperDiv).toHaveStyleRule('max-width', '1000px');
      expect(wContentWrapperDiv).toHaveStyleRule('padding', '3rem 10%');
      expect(wContentWrapperDiv).toHaveStyleRule('margin', '3rem auto');
      expect(wContentWrapperDiv).toHaveStyleRule('background-color', 'white');
      expect(wContentWrapperDiv).toHaveStyleRule('border-radius', '5px');
    });
  });
});
