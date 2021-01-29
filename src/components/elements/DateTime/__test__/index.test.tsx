import { DateTime } from '@/src/components/elements/DateTime';
import { theme } from '@/src/constants/theme';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('DateTime', () => {
  const testDate = new Date('2021-01-02T03:04:56.000Z');
  const testDescription = 'TEST DESCRIPTION';

  describe('is rendered correctly to match the snapshot', () => {
    test('in case with description', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <DateTime date={testDate} description={testDescription} />
        </ThemeProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('in case without description', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <DateTime date={testDate} />
        </ThemeProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('children are correctly rendered', () => {
    test('in case with description', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <DateTime date={testDate} description={testDescription} />
        </ThemeProvider>
      );

      expect(wrapper.find('DateTime').find('time').text()).toEqual(
        '2021-01-02T03:04:56.000Z'
      );
      expect(wrapper.find('DescriptionSpan').text()).toEqual(
        `${testDescription}:`
      );
    });

    test('in case without description', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <DateTime date={testDate} />
        </ThemeProvider>
      );
      expect(wrapper.find('DateTime').find('time').text()).toEqual(
        '2021-01-02T03:04:56.000Z'
      );
      expect(wrapper.find('DescriptionSpan')).toHaveLength(0);
    });
  });

  describe('has proper style rules', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <DateTime date={testDate} description={testDescription} />
      </ThemeProvider>
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

    test('in ISODateTime', () => {
      expect(wrapper.find('ISODateTime')).toHaveStyleRule(
        'font-weight',
        'bolder'
      );
      expect(wrapper.find('ISODateTime')).toHaveStyleRule(
        'color',
        `${theme.color.text.secondary}`
      );
    });
  });
});
