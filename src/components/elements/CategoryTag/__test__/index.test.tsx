import { CategoryTag } from '@/src/components/elements/CategoryTag';
import { theme } from '@/src/constants/theme';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('CategoryTag', () => {
  const testTagName = 'test-cat';

  test('is rendered correctly to match the snapshot', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <CategoryTag name={testTagName} />
      </ThemeProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('has the correct text', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <CategoryTag name={testTagName} />
      </ThemeProvider>
    );
    expect(wrapper.find('a').text()).toBe(testTagName);
  });

  test('links properly to `/tags/:name`', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <CategoryTag name={testTagName} />
      </ThemeProvider>
    );
    expect(wrapper.find('a').prop('href')).toEqual('/tags/test-cat');
  });

  describe('has proper style rules', () => {
    test('in Anchor', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <CategoryTag name={testTagName} />
        </ThemeProvider>
      );
      expect(wrapper.find('Anchor')).toHaveStyleRule('padding', '3% 1rem 4%');
      expect(wrapper.find('Anchor')).toHaveStyleRule('margin', '0');
      expect(wrapper.find('Anchor')).toHaveStyleRule('font-size', '0.8em');
      expect(wrapper.find('Anchor')).toHaveStyleRule('font-weight', '600');
      expect(wrapper.find('Anchor')).toHaveStyleRule('color', 'white');
      expect(wrapper.find('Anchor')).toHaveStyleRule('text-decoration', 'none');
      expect(wrapper.find('Anchor')).toHaveStyleRule(
        'background-color',
        theme.color.blue.dark
      );
      expect(wrapper.find('Anchor')).toHaveStyleRule(
        'filter',
        new RegExp(
          `drop-shadow\\((\\r?\\n)?(\\s+)2px 2px 1px ${theme.color.blue.light2.replace(
            /[()]/g,
            '\\$&'
          )}(\\r?\\n)?(\\s+)\\)`
        )
      );
      expect(wrapper.find('Anchor')).toHaveStyleRule('border-radius', '3px');

      expect(wrapper.find('Anchor')).toHaveStyleRule('color', 'white', {
        target: ':hover',
      });
      expect(wrapper.find('Anchor')).toHaveStyleRule(
        'background-color',
        theme.color.blue.base,
        {
          target: ':hover',
        }
      );

      expect(wrapper.find('Anchor')).toHaveStyleRule('color', 'white', {
        target: ':visited',
      });
    });
  });
});
