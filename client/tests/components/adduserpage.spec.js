import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { AddUserPage } from '../../src/components/home/AddUserPage.jsx';

const setup = () => {
  const props = {
    addUserToGroup: (() => {}),
    groupId: 1,
    getUsers: (() => {}),
    users: []

  };

  return shallow(<AddUserPage {...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<AddUserPage/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(false);
      expect(wrapper.find('Link').exists()).toBe(false);
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('should change on user input', () => {
      wrapper.find('.username')
      .simulate('change', { target: { name: 'username', value: 'boruto' } });
      expect(wrapper.find('.username').prop('value')).toEqual('boruto');
      wrapper.instance().isValid();
    });

    it('should call onChange function when user`s input changes', () => {
      const event = { target: { name: 'username', value: 'man' } };
      wrapper.find('.username').simulate('change', event);
      wrapper.instance().onChange(event);
      expect(wrapper.find('.username').props().onChange).toBeA('function');
    });
  });
});
