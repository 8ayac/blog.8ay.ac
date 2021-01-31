import { config } from '@/site.config';
import { BasicOGPMeta } from '@/src/components/elements/BasicOGPMeta';
import { mount } from 'enzyme';
import React from 'react';
import urljoin from 'url-join';

describe('BasicOGPMeta', () => {
  const testProps = {
    ogTitle: 'Test Title',
    ogType: 'testtype',
    ogDescription: 'This is a test Description',
    ogImageUrl: 'https://blog.8ay.ac/favicon.png',
    ogUrl: 'https://blog.8ay.ac/THIS_IS_TEST',
  };

  test('is rendered correctly to match the snapshot', () => {
    const wrapper = mount(<BasicOGPMeta {...testProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('has correct metadata', () => {
    const wrapper = mount(<BasicOGPMeta {...testProps} />);

    test('og:title', () => {
      expect(wrapper.find('meta[property="og:title"]').prop('content')).toBe(
        'Test Title'
      );
    });

    test('og:type', () => {
      expect(wrapper.find('meta[property="og:type"]').prop('content')).toBe(
        'testtype'
      );
    });

    test('og:description', () => {
      expect(
        wrapper.find('meta[property="og:description"]').prop('content')
      ).toBe('This is a test Description');
    });

    test('og:image', () => {
      expect(wrapper.find('meta[property="og:image"]').prop('content')).toBe(
        'https://blog.8ay.ac/favicon.png'
      );
    });

    test('og:url', () => {
      expect(wrapper.find('meta[property="og:url"]').prop('content')).toBe(
        'https://blog.8ay.ac/THIS_IS_TEST'
      );
    });

    test('og:site_name', () => {
      expect(
        wrapper.find('meta[property="og:site_name"]').prop('content')
      ).toBe(config.site.title);
    });
  });

  it('set og:image content to default value when ogImage is null', () => {
    const wrapper = mount(
      <BasicOGPMeta {...testProps} ogImageUrl={undefined} />
    );
    expect(wrapper.find('meta[property="og:image"]').prop('content')).toBe(
      urljoin(config.site.rootUrl, 'og.png')
    );
  });
});
