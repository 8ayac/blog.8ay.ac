import { CategoryTagList } from '@/src/components/widgets/CategoryTagList';
import { theme } from '@/src/constants/theme';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('CategoryTagList', () => {
  const testTags = ['A', 'B', 'C', 'DUPLICATE', 'DUPLICATE'];

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <CategoryTagList tags={testTags} />
        </ThemeProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('to contain the correct count of children', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <CategoryTagList tags={testTags} />
        </ThemeProvider>
      );
      expect(wrapper.find('CategoryTag')).toHaveLength(4);
    });
  });

  describe('has proper style rules', () => {
    test('in ComponentWrapperDiv', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <CategoryTagList tags={testTags} />
        </ThemeProvider>
      );

      expect(wrapper.find('ComponentWrapperDiv').first()).toHaveStyleRule(
        'display',
        'inline-flex'
      );
      expect(wrapper.find('ComponentWrapperDiv').first()).toHaveStyleRule(
        'margin',
        '0 0.7rem 0.7rem 0'
      );
    });
  });
});
