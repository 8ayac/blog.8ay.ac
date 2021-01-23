import { SocialLinkWithIcon } from '@/src/components/elements/SocialLinkWithIcon';
import { theme } from '@/src/constants/theme';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { shallow } from 'enzyme';
import React from 'react';

describe('SocialLinkWithIcon', () => {
  const defaultProps = {
    url: 'http://example.com/',
    description: 'this is a test',
    icon: undefined,
    color: undefined,
  };
  const wrapper = shallow(<SocialLinkWithIcon {...defaultProps} />);

  afterEach(() => {
    wrapper.setProps(defaultProps);
  });

  describe('is rendered correctly to match the snapshot', () => {
    test('with the specified icon', () => {
      wrapper.setProps({
        ...defaultProps,
        icon: faTwitter,
      });
      expect(wrapper).toMatchSnapshot();
    });

    test('without the specified icon', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('is rendered with the proper icon', () => {
    test('with the specified icon', () => {
      wrapper.setProps({
        ...defaultProps,
        icon: faTwitter,
      });
      expect(wrapper.find('[icon]')).toHaveLength(1);
      expect(wrapper.find('[icon]').prop('icon')).toHaveProperty(
        'iconName',
        'twitter'
      );
    });

    test('without the specified icon', () => {
      expect(wrapper.find('[icon]')).toHaveLength(1);
      expect(wrapper.find('[icon]').prop('icon')).toHaveProperty(
        'iconName',
        'link'
      );
    });
  });

  describe('has proper style rules', () => {
    test('ComponentWrapperDiv', () => {
      expect(wrapper.find('ComponentWrapperDiv')).toHaveStyleRule(
        'margin',
        '0 0.5rem'
      );
    });

    describe('in SocialLinkAnchor', () => {
      test('when given nothing as color', () => {
        const wSocialLinkAnchor = wrapper.find('SocialLinkAnchor');

        expect(wSocialLinkAnchor).toHaveStyleRule('color', 'inherit');
        expect(wSocialLinkAnchor).toHaveStyleRule('font-size', '2.2rem');
        expect(wSocialLinkAnchor).toHaveStyleRule('text-decoration', 'none');
        expect(wSocialLinkAnchor).toHaveStyleRule(
          'color',
          `${theme.color.yellow.base}`,
          {
            target: ':hover',
          }
        );
      });

      test("when given 'white' as color", () => {
        wrapper.setProps({
          color: 'white',
        });

        expect(wrapper.find('SocialLinkAnchor')).toHaveStyleRule(
          'color',
          'white'
        );
      });
    });

    test('in LinkDescriptionSpan', () => {
      expect(wrapper.find('LinkDescriptionSpan')).toHaveStyleRule(
        'margin-left',
        '0.5rem'
      );
    });
  });
});
