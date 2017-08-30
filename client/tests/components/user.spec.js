import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { User } from '../../src/components/home/User';

const mockEvent = {
  preventDefault: () => {}
};

const setup = () => {

  const props = {
    username: '',
    addUserToGroup: () => {},
    groupId: 0,
    userId: 0,
    members: [],
    onClick: () => {
      mockEvent.preventDefault();
    }
  };
  return shallow(<User {...props} />);
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
      wrapper.find('.add-user-btn').simulate('click', { preventDefault: () => {} });
      expect(wrapper.find('.add-user-btn').props().onClick).toBeA('function');
      // expect(User.prototype.onClick.callCount).toEqual(1);
    });
  });
});
