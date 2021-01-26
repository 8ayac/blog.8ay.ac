import { BodyHeader } from '@/src/components/elements/BodyHeader';
import { theme } from '@/src/constants/theme';
import { mount, shallow } from 'enzyme';
import React from 'react';

describe('BodyHeader', () => {
  const testTitle = 'Test Title';
  const testBeforeTitle = <div>BEFORE</div>;
  const testAfterTitle = <div>AFTER</div>;

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      const wrapper = mount(
        <BodyHeader
          title={testTitle}
          beforeTitle={testBeforeTitle}
          afterTitle={testAfterTitle}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    describe('under certain conditions', () => {
      test('title: passed, beforeTitle: passed, afterTitle: passed', () => {
        const wrapper = shallow(
          <BodyHeader
            title={testTitle}
            beforeTitle={testBeforeTitle}
            afterTitle={testAfterTitle}
          />
        );

        expect(wrapper.find('TitleH1')).toHaveLength(1);
        expect(wrapper.find('BeforeTitleDiv')).toHaveLength(1);
        expect(wrapper.find('AfterTitleDiv')).toHaveLength(1);
      });

      test('title: passed, beforeTitle: passed, afterTitle: NOT passed', () => {
        const wrapper = shallow(
          <BodyHeader title={testTitle} beforeTitle={testBeforeTitle} />
        );

        expect(wrapper.find('TitleH1')).toHaveLength(1);
        expect(wrapper.find('BeforeTitleDiv')).toHaveLength(1);
        expect(wrapper.find('AfterTitleDiv')).toHaveLength(0);
      });

      test('title: passed, beforeTitle: NOT passed, afterTitle: passed', () => {
        const wrapper = shallow(
          <BodyHeader title={testTitle} afterTitle={testBeforeTitle} />
        );

        expect(wrapper.find('TitleH1')).toHaveLength(1);
        expect(wrapper.find('BeforeTitleDiv')).toHaveLength(0);
        expect(wrapper.find('AfterTitleDiv')).toHaveLength(1);
      });

      test('title: passed, beforeTitle: NOT passed, afterTitle: NOT passed', () => {
        const wrapper = shallow(<BodyHeader title={testTitle} />);

        expect(wrapper.find('TitleH1')).toHaveLength(1);
        expect(wrapper.find('BeforeTitleDiv')).toHaveLength(0);
        expect(wrapper.find('AfterTitleDiv')).toHaveLength(0);
      });
    });
  });

  describe('has proper style rules', () => {
    const wrapper = mount(
      <BodyHeader
        title={testTitle}
        beforeTitle={testBeforeTitle}
        afterTitle={testAfterTitle}
      />
    );

    test('in WrapperHeader', () => {
      expect(wrapper.find('WrapperHeader')).toHaveStyleRule(
        'margin-bottom',
        '3rem'
      );
      expect(wrapper.find('WrapperHeader')).toHaveStyleRule(
        'border-bottom',
        `0.25rem solid ${theme.color.border.primaryLight}`
      );
    });

    test('in TitleH1', () => {
      expect(wrapper.find('TitleH1')).toHaveStyleRule('font-size', '2.16em');
      expect(wrapper.find('TitleH1')).toHaveStyleRule('margin', '0 0 1rem');
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
