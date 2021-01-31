import { CategoryTagList } from '@/src/components/widgets/CategoryTagList';
import { theme } from '@/src/constants/theme';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('CategoryTagList', () => {
  const testTags = ['A', 'B', 'C', 'DUPLICATE', 'DUPLICATE'];

  describe('is rendered correctly', () => {
    describe('to match the snapshot', () => {
      test('with preIcon', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <CategoryTagList tags={testTags} withPreIcon />
          </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot();
      });

      test('without preIcon (default)', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <CategoryTagList tags={testTags} />
          </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    test('to contain the correct count of children', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <CategoryTagList tags={testTags} />
        </ThemeProvider>
      );
      expect(wrapper.find('CategoryTag')).toHaveLength(4);
    });

    test("when passed the optional prop 'withPreIcon'", () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <CategoryTagList tags={testTags} withPreIcon />
        </ThemeProvider>
      );
      expect(wrapper.find('S-PreIconWrapperDiv')).toHaveLength(1);
    });

    test("when NOT passed the optional prop 'withPreIcon' (default)", () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <CategoryTagList tags={testTags} />
        </ThemeProvider>
      );
      expect(wrapper.find('S-PreIconWrapperDiv')).toHaveLength(0);
    });
  });

  describe('has proper style rules', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <CategoryTagList tags={testTags} withPreIcon />
      </ThemeProvider>
    );

    test('in ComponentWrapperDiv', () => {
      expect(wrapper.find('S-ComponentWrapperDiv').first()).toHaveStyleRule(
        'display',
        'flex'
      );
      expect(
        wrapper.find('S-ComponentWrapperDiv').first()
      ).toHaveStyleRule('margin-right', '0.7rem', { target: '*' });
      expect(
        wrapper.find('S-ComponentWrapperDiv').first()
      ).toHaveStyleRule('margin-bottom', '0.7rem', { target: '*' });
    });

    test('in PreIconWrapperDiv', () => {
      expect(wrapper.find('S-PreIconWrapperDiv').first()).toHaveStyleRule(
        'display',
        'flex'
      );
      expect(wrapper.find('S-PreIconWrapperDiv').first()).toHaveStyleRule(
        'align-items',
        'center'
      );
      expect(wrapper.find('S-PreIconWrapperDiv').first()).toHaveStyleRule(
        'color',
        `${theme.color.text.primaryLight}`
      );
    });
  });
});
