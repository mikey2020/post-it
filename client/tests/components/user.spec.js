import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { User } from '../../src/components/home/User';


const setup = () => {

  const props = {
    username: '',
    addUserToGroup: '',
    groupId: '',
    onClick: () => {}
  };
  return mount(<User {...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<User/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('li').exists()).toBe(true);
      expect(wrapper.find('Link').exists()).toBe(false);
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('calls onClick', () => {
      const mockEvent = {
        preventDefault: () => {},
      };
      wrapper.find('.add-user-btn').simulate('click');
      expect(wrapper.find('.add-user-btn').props().onClick).toBeA('function');
      expect(wrapper.prototype.onClick.callCount).toEqual(1);
    });
  });
});
