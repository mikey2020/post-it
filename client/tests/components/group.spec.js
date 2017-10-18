import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Group } from '../../src/components/home/Group';

const setup = () => {
  const props = {
    groupname: '',
    setCurrentGroup: (() => {}),
    group: {}
  };

  return shallow(<Group{...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<Group/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.find('.group').exists()).toBe(true);
    });

    it('should call onClick function when button with classname `group` is clicked', () => {
      wrapper.find('.group').simulate('click',
      { preventDefault: () => {} });
      expect(wrapper.find('.group').props().onClick).toBeA('function');
    });
  });
});
