import { CategoryTagList } from '@/src/components/widgets/CategoryTagList';
import { mount, shallow } from 'enzyme';
import React from 'react';

describe('CategoryTagList', () => {
  const testTags = ['A', 'B', 'C', 'DUPLICATE', 'DUPLICATE'];

  describe('is rendered correctly', () => {
    test('to match the snapshot', () => {
      const wrapper = mount(<CategoryTagList tags={testTags} />);
      expect(wrapper).toMatchSnapshot();
    });

    test('to contain the correct count of children', () => {
      const wrapper = shallow(<CategoryTagList tags={testTags} />);
      expect(wrapper.find('CategoryTag')).toHaveLength(4);
    });
  });

  describe('has proper style rules', () => {
    test('in ComponentWrapperDiv', () => {
      const wrapper = shallow(<CategoryTagList tags={testTags} />);

      expect(wrapper.find('ComponentWrapperDiv').first()).toHaveStyleRule(
        'display',
        'inline-flex'
      );
      expect(wrapper.find('ComponentWrapperDiv').first()).toHaveStyleRule(
        'margin',
        '0 0.5rem 0.5rem 0'
      );
    });
  });
});
