import { config } from '@/site.config';
import { TwitterOGPMeta } from '@/src/components/elements/TwitterOGPMeta';
import { mount } from 'enzyme';
import React from 'react';
import urljoin from 'url-join';

describe('TwitterOGPMeta', () => {
  const testOgImageUrl = 'https://blog.8ay.ac/favicon.png';

  describe('is rendered correctly to match the snapshot', () => {
    test('when ogImageUrl is empty', () => {
      const wrapper = mount(<TwitterOGPMeta />);
      expect(wrapper).toMatchSnapshot();
    });

    test('when ogImageUrl is specified', () => {
      const wrapper = mount(<TwitterOGPMeta ogImageUrl={testOgImageUrl} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('has correct metadata', () => {
    const wrapper = mount(<TwitterOGPMeta ogImageUrl={testOgImageUrl} />);

    beforeEach(() => {
      wrapper.setProps({ ogImageUrl: testOgImageUrl });
      wrapper.update();
    });

    test('twitter:card', () => {
      expect(wrapper.find('meta[name="twitter:card"]').prop('content')).toBe(
        'summary_large_image'
      );
    });

    test('twitter:site', () => {
      expect(wrapper.find('meta[name="twitter:site"]').prop('content')).toBe(
        `@${config.site.maintainer}`
      );
    });

    test('twitter:creator', () => {
      expect(wrapper.find('meta[name="twitter:creator"]').prop('content')).toBe(
        `@${config.site.maintainer}`
      );
    });

    describe('twitter:image', () => {
      test('when ogImageUrl is empty ', () => {
        wrapper.setProps({ ogImageUrl: undefined });
        wrapper.update();

        expect(wrapper.find('meta[name="twitter:image"]').prop('content')).toBe(
          urljoin(config.site.rootUrl, 'og.png')
        );
      });

      test('when ogImageUrl is specified', () => {
        expect(wrapper.find('meta[name="twitter:image"]').prop('content')).toBe(
          'https://blog.8ay.ac/favicon.png'
        );
      });
    });
  });
});
