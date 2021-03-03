import { CustomImage } from '@/src/components/elements/MarkdownRenderer/CustomRenderers/CustomImage';
import { mount } from 'enzyme';
import React from 'react';

describe('CustomImage', () => {
  const TEST_WIDTH = 100;
  const TEST_HEIGHT = 200;

  const testPropsSrcIsRelativePath = {
    src: `/a.png?w=${TEST_WIDTH}&h=${TEST_HEIGHT}`,
    alt: 'this is a test image',
    title: 'Test Image',
  };
  const testPropsSrcIsURL = {
    src: `http://example.com/a.png?w=${TEST_WIDTH}&h=${TEST_HEIGHT}`,
    alt: 'this is a test image',
    title: 'Test Image',
  };
  const testPropsWithoutImageWidthAndHeight = {
    src: '/a.png',
    alt: 'this is a test image',
    title: 'Test Image',
  };

  describe('renders images correctly', () => {
    describe('to match the snapshot', () => {
      test("when setting a relative image path to the value of 'src'", () => {
        const wrapper = mount(<CustomImage {...testPropsSrcIsRelativePath} />);
        expect(wrapper).toMatchSnapshot();
      });

      test("when setting image URL to the value of 'src'", () => {
        const wrapper = mount(<CustomImage {...testPropsSrcIsURL} />);
        expect(wrapper).toMatchSnapshot();
      });

      test("when setting the image path without width and height to the value of 'src'", () => {
        const wrapper = mount(
          <CustomImage {...testPropsWithoutImageWidthAndHeight} />
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('with specified sizes', () => {
      test("when setting a relative image path to the value of 'src'", () => {
        const wrapper = mount(<CustomImage {...testPropsSrcIsRelativePath} />);
        expect(wrapper.find('Image').prop('width')).toBe(`${TEST_WIDTH}px`);
        expect(wrapper.find('Image').prop('height')).toBe(`${TEST_HEIGHT}px`);
      });

      test("when setting image URL to the value of 'src'", () => {
        const wrapper = mount(<CustomImage {...testPropsSrcIsURL} />);
        expect(wrapper.find('Image').prop('width')).toBe(`${TEST_WIDTH}px`);
        expect(wrapper.find('Image').prop('height')).toBe(`${TEST_HEIGHT}px`);
      });

      test("when setting the image path without width and height to the value of 'src'", () => {
        const wrapper = mount(
          <CustomImage {...testPropsWithoutImageWidthAndHeight} />
        );
        expect(wrapper.find('Image')).toHaveLength(0);
      });
    });

    describe('with proper attributes', () => {
      test("when setting a relative image path to the value of 'src'", () => {
        const wrapper = mount(<CustomImage {...testPropsSrcIsRelativePath} />);
        expect(wrapper.find('Image').prop('src')).toBe(
          testPropsSrcIsRelativePath.src
        );
        expect(wrapper.find('Image').prop('alt')).toBe(
          testPropsSrcIsRelativePath.alt
        );
        expect(wrapper.find('Image').prop('title')).toBe(
          testPropsSrcIsRelativePath.title
        );

        expect(wrapper.find('Image').prop('width')).toBe(`${TEST_WIDTH}px`);
        expect(wrapper.find('Image').prop('height')).toBe(`${TEST_HEIGHT}px`);
      });
    });

    test("when setting image URL to the value of 'src'", () => {
      const wrapper = mount(<CustomImage {...testPropsSrcIsURL} />);
      expect(wrapper.find('Image').prop('src')).toBe(testPropsSrcIsURL.src);
      expect(wrapper.find('Image').prop('alt')).toBe(testPropsSrcIsURL.alt);
      expect(wrapper.find('Image').prop('title')).toBe(testPropsSrcIsURL.title);

      expect(wrapper.find('Image').prop('width')).toBe(`${TEST_WIDTH}px`);
      expect(wrapper.find('Image').prop('height')).toBe(`${TEST_HEIGHT}px`);
    });

    test("when setting the image path without width and height to the value of 'src'", () => {
      const wrapper = mount(
        <CustomImage {...testPropsWithoutImageWidthAndHeight} />
      );
      expect(wrapper.find('Image')).toHaveLength(0);

      expect(wrapper.find('img').prop('src')).toBe(
        testPropsWithoutImageWidthAndHeight.src
      );
      expect(wrapper.find('img').prop('alt')).toBe(
        testPropsWithoutImageWidthAndHeight.alt
      );
      expect(wrapper.find('img').prop('title')).toBe(
        testPropsWithoutImageWidthAndHeight.title
      );
    });
  });
});
