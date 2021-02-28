import { CategoryTag } from '@/src/components/elements/CategoryTag';
import { theme } from '@/src/constants/theme';
import { mockArticleData } from '@/src/shared/__mocks__/articleData';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('CategoryTag', () => {
  const testTagName = mockArticleData.t1.attributes.tags[0];

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
    expect(wrapper.find('a').prop('href')).toEqual(`/tags/${testTagName}`);
  });

  describe('has proper style rules', () => {
    test('in Anchor', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <CategoryTag name={testTagName} />
        </ThemeProvider>
      );
      const expectedShadowColor = theme.color.categoryTag.anchor.shadow;

      expect(wrapper.find('Anchor')).toHaveStyleRule('padding', '0.2rem 1rem');
      expect(wrapper.find('Anchor')).toHaveStyleRule('font-size', '0.8em');
      expect(wrapper.find('Anchor')).toHaveStyleRule('color', 'white');
      expect(wrapper.find('Anchor')).toHaveStyleRule('text-decoration', 'none');
      expect(wrapper.find('Anchor')).toHaveStyleRule(
        'background-color',
        theme.color.categoryTag.anchor.bg
      );
      expect(wrapper.find('Anchor')).toHaveStyleRule(
        'filter',
        new RegExp(
          `drop-shadow\\((\\r?\\n)?(\\s+)2px 2px 1px(\\s+)${expectedShadowColor.replace(
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
        theme.color.categoryTag.anchor.bgOnHover,
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
