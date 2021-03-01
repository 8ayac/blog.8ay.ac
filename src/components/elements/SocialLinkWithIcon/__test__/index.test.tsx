import { SocialLinkWithIcon } from '@/src/components/elements/SocialLinkWithIcon';
import { theme } from '@/src/constants/theme';
import { mq } from '@/src/shared/styles/mediaQuery';
import { ThemeProvider } from '@emotion/react';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { mount } from 'enzyme';
import React from 'react';

describe('SocialLinkWithIcon', () => {
  const defaultProps = {
    url: 'http://example.com/',
    description: 'this is a test',
    icon: undefined,
    color: undefined,
  };

  describe('is rendered correctly to match the snapshot', () => {
    test('with the specified icon', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <SocialLinkWithIcon {...defaultProps} icon={faTwitter} />
        </ThemeProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('without the specified icon', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <SocialLinkWithIcon {...defaultProps} />
        </ThemeProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  test('specified \'target="_blank"\' and \'rel="noopener"\'', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <SocialLinkWithIcon {...defaultProps} />
      </ThemeProvider>
    );

    expect(wrapper.find('a').prop('target')).toBe('_blank');
    expect(wrapper.find('a').prop('rel')).toBe('noopener');
  });

  describe('is rendered with the proper icon', () => {
    test('with the specified icon', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <SocialLinkWithIcon {...defaultProps} icon={faTwitter} />
        </ThemeProvider>
      );

      expect(wrapper.find('FontAwesomeIcon')).toHaveLength(1);
      expect(wrapper.find('FontAwesomeIcon').prop('icon')).toHaveProperty(
        'iconName',
        'twitter'
      );
    });

    test('without the specified icon', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <SocialLinkWithIcon {...defaultProps} />
        </ThemeProvider>
      );

      expect(wrapper.find('FontAwesomeIcon')).toHaveLength(1);
      expect(wrapper.find('FontAwesomeIcon').prop('icon')).toHaveProperty(
        'iconName',
        'link'
      );
    });
  });

  describe('has proper style rules', () => {
    test('ComponentWrapperDiv', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <SocialLinkWithIcon {...defaultProps} />
        </ThemeProvider>
      );

      expect(wrapper.find('ComponentWrapperDiv')).toHaveStyleRule(
        'margin',
        '0 0.5rem'
      );
    });

    describe('in SocialLinkAnchor', () => {
      test('when given nothing as color', () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <SocialLinkWithIcon {...defaultProps} />
          </ThemeProvider>
        );
        const wSocialLinkAnchor = wrapper.find('SocialLinkAnchor');

        expect(wSocialLinkAnchor).toHaveStyleRule('color', 'inherit');
        expect(wSocialLinkAnchor).toHaveStyleRule('font-size', '2.2rem');
        expect(wSocialLinkAnchor).toHaveStyleRule('text-decoration', 'none');

        expect(wSocialLinkAnchor).toHaveStyleRule('color', 'inherit', {
          target: ':visited',
        });
        expect(wSocialLinkAnchor).toHaveStyleRule(
          'color',
          theme.color.socialLinkWithIcon.socialLinkAnchor.textOnHover,
          {
            target: ':hover',
          }
        );

        expect(wSocialLinkAnchor).toHaveStyleRule('display', 'flex', {
          media: mq('sm'),
        });
        expect(wSocialLinkAnchor).toHaveStyleRule('flex-flow', 'column wrap', {
          media: mq('sm'),
        });
        expect(wSocialLinkAnchor).toHaveStyleRule('align-items', 'center', {
          media: mq('sm'),
        });
      });

      test("when given 'white' as color", () => {
        const wrapper = mount(
          <ThemeProvider theme={theme}>
            <SocialLinkWithIcon {...defaultProps} color="white" />
          </ThemeProvider>
        );

        expect(wrapper.find('SocialLinkAnchor')).toHaveStyleRule(
          'color',
          'white'
        );
      });
    });

    test('in LinkDescriptionSpan', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <SocialLinkWithIcon {...defaultProps} />
        </ThemeProvider>
      );

      expect(wrapper.find('LinkDescriptionSpan')).toHaveStyleRule(
        'margin-left',
        '0.5rem'
      );

      expect(wrapper.find('LinkDescriptionSpan')).toHaveStyleRule(
        'margin-left',
        '0',
        { media: mq('sm') }
      );
      expect(wrapper.find('LinkDescriptionSpan')).toHaveStyleRule(
        'font-size',
        '1rem',
        { media: mq('sm') }
      );
    });
  });
});
