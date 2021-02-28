import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { theme } from '@/src/constants/theme';
import { mockArticleData } from '@/src/shared/__mocks__/articleData';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

describe('BodyHeader', () => {
  const testTitle = mockArticleData.t1.attributes.title;
  const testLinkTo = '/';
  const testBeforeTitle = <div>BEFORE</div>;
  const testAfterTitle = <div>AFTER</div>;

  describe('is rendered correctly', () => {
    describe('to match the snapshot', () => {
      test('when linkTo is not given', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <BodyHeader
              title={testTitle}
              beforeTitle={testBeforeTitle}
              afterTitle={testAfterTitle}
            />
          </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot();
      });

      test('when linkTo is given', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <BodyHeader
              title={testTitle}
              linkTo={testLinkTo}
              beforeTitle={testBeforeTitle}
              afterTitle={testAfterTitle}
            />
          </ThemeProvider>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('under certain conditions', () => {
      test('linkTo: passed', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <BodyHeader
              title={testTitle}
              linkTo={testLinkTo}
              beforeTitle={testBeforeTitle}
              afterTitle={testAfterTitle}
            />
          </ThemeProvider>
        );
        expect(wrapper.find('Link')).toHaveLength(1);
      });

      test('linkTo: NOT passed', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <BodyHeader
              title={testTitle}
              beforeTitle={testBeforeTitle}
              afterTitle={testAfterTitle}
            />
          </ThemeProvider>
        );
        expect(wrapper.find('Link')).toHaveLength(0);
      });

      test('title: passed, beforeTitle: passed, afterTitle: passed', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <BodyHeader
              title={testTitle}
              beforeTitle={testBeforeTitle}
              afterTitle={testAfterTitle}
            />
          </ThemeProvider>
        );

        expect(wrapper.find('TitleH1')).toHaveLength(1);
        expect(wrapper.find('BeforeTitleDiv')).toHaveLength(1);
        expect(wrapper.find('AfterTitleDiv')).toHaveLength(1);
      });

      test('title: passed, beforeTitle: passed, afterTitle: NOT passed', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <BodyHeader title={testTitle} beforeTitle={testBeforeTitle} />
          </ThemeProvider>
        );

        expect(wrapper.find('TitleH1')).toHaveLength(1);
        expect(wrapper.find('BeforeTitleDiv')).toHaveLength(1);
        expect(wrapper.find('AfterTitleDiv')).toHaveLength(0);
      });

      test('title: passed, beforeTitle: NOT passed, afterTitle: passed', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <BodyHeader title={testTitle} afterTitle={testBeforeTitle} />
          </ThemeProvider>
        );

        expect(wrapper.find('TitleH1')).toHaveLength(1);
        expect(wrapper.find('BeforeTitleDiv')).toHaveLength(0);
        expect(wrapper.find('AfterTitleDiv')).toHaveLength(1);
      });

      test('title: passed, beforeTitle: NOT passed, afterTitle: NOT passed', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <BodyHeader title={testTitle} />
          </ThemeProvider>
        );

        expect(wrapper.find('TitleH1')).toHaveLength(1);
        expect(wrapper.find('BeforeTitleDiv')).toHaveLength(0);
        expect(wrapper.find('AfterTitleDiv')).toHaveLength(0);
      });
    });
  });

  describe('has proper style rules', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <BodyHeader
          title={testTitle}
          linkTo={testLinkTo}
          beforeTitle={testBeforeTitle}
          afterTitle={testAfterTitle}
        />
      </ThemeProvider>
    );

    test('in WrapperHeader', () => {
      expect(wrapper.find('WrapperHeader')).toHaveStyleRule(
        'margin-bottom',
        '3rem'
      );
      expect(wrapper.find('WrapperHeader')).toHaveStyleRule(
        'border-bottom',
        `0.25rem solid ${theme.color.common.border.primaryLight}`
      );
    });

    test('in TitleH1', () => {
      expect(wrapper.find('TitleH1')).toHaveStyleRule('font-size', '2.16em');
      expect(wrapper.find('TitleH1')).toHaveStyleRule('margin', '0 0 1rem');
    });

    test('in TitleAnchor', () => {
      const expectedShadowColor = theme.color.bodyHeader.titleAnchor.shadow;
      expect(wrapper.find('TitleAnchor')).toHaveStyleRule('margin', '0');
      expect(wrapper.find('TitleAnchor')).toHaveStyleRule(
        'color',
        `${theme.color.common.text.primary}`
      );
      expect(wrapper.find('TitleAnchor')).toHaveStyleRule(
        'text-decoration',
        'none'
      );
      expect(wrapper.find('TitleAnchor')).toHaveStyleRule(
        'filter',
        new RegExp(
          `drop-shadow\\((\\r?\\n)?(\\s+)2px 2px 1px ${expectedShadowColor.replace(
            /[()]/g,
            '\\$&'
          )}(\\r?\\n)?(\\s+)\\)`
        )
      );

      expect(wrapper.find('TitleAnchor')).toHaveStyleRule(
        'color',
        `${theme.color.common.text.primary}`,
        { target: ':visited' }
      );
    });

    test('in BeforeTitleDiv', () => {
      expect(wrapper.find('BeforeTitleDiv')).toHaveStyleRule(
        'margin-bottom',
        '0.3rem'
      );
    });

    test('in AfterTitleDiv:', () => {
      expect(wrapper.find('AfterTitleDiv')).toHaveStyleRule(
        'margin-top',
        '0.3rem'
      );
    });
  });
});
