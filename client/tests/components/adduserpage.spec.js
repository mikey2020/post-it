import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { AddUserPage } from '../../src/components/home/AddUserPage.jsx';

const getUsers = sinon.spy(() => Promise.resolve());

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
      expect(AddUserPage.prototype.isValid.calledOnce).toBe(true);
    });

    it('should call onChange function', () => {
      const event = { target: { name: 'username', value: 'man' } };
      wrapper.find('.username').simulate('change', event);
      wrapper.instance().onChange(event);
      expect(wrapper.find('.username').props().onChange).toBeA('function');
    });
  });
});
