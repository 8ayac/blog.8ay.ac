import { DateTime } from '@/src/components/elements/DateTime';
import { theme } from '@/src/constants/theme';
import { mount, shallow } from 'enzyme';
import React from 'react';

describe('DateTime', () => {
  const testDate = '2021-01-02 03:04:56 +0000';
  const testDescription = 'TEST DESCRIPTION';

  describe('is rendered correctly to match the snapshot', () => {
    test('in case with description', () => {
      const wrapper = mount(
        <DateTime date={testDate} description={testDescription} />
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('in case without description', () => {
      const wrapper = mount(<DateTime date={testDate} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('children are correctly rendered', () => {
    test('in case with description', () => {
      const wrapper = shallow(
        <DateTime date={testDate} description={testDescription} />
      );
      expect(wrapper.find('DateTime').text()).toEqual(
        '2021-01-02T03:04:56.000Z'
      );
      expect(wrapper.find('DescriptionSpan').text()).toEqual(
        `${testDescription}:`
      );
    });

    test('in case without description', () => {
      const wrapper = shallow(<DateTime date={testDate} />);
      expect(wrapper.find('DateTime').text()).toEqual(
        '2021-01-02T03:04:56.000Z'
      );
      expect(wrapper.find('DescriptionSpan')).toHaveLength(0);
    });
  });

  describe('has proper style rules', () => {
    const wrapper = shallow(
      <DateTime date={testDate} description={testDescription} />
    );

    test('in ComponentWrapperDiv', () => {
      expect(wrapper.find('ComponentWrapperDiv')).toHaveStyleRule(
        'display',
        'flex'
      );
      expect(wrapper.find('ComponentWrapperDiv')).toHaveStyleRule(
        'flex-flow',
        'row wrap'
      );
    });

    test('in DescriptionSpan', () => {
      expect(wrapper.find('DescriptionSpan')).toHaveStyleRule(
        'margin-right',
        '0.5rem'
      );
      expect(wrapper.find('DescriptionSpan')).toHaveStyleRule(
        'font-weight',
        '600'
      );
    });

    test('in DateTime', () => {
      expect(wrapper.find('DateTime')).toHaveStyleRule('font-weight', 'bolder');
      expect(wrapper.find('DateTime')).toHaveStyleRule(
        'color',
        `${theme.color.text.secondary}`
      );
    });
  });
});
