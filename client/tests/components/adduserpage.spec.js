import React from 'react';

import expect from 'expect';

import { shallow } from 'enzyme';

import { AddUserPage } from '../../src/components/home/AddUserPage';


const setup = () => {
  const props = {
    addUserToGroup: (() => {}),
    groupId: '',
    getUsers: (() => {}),
    users: []

  };

  return shallow(<AddUserPage {...props} />);
};

const wrapper = setup();


xdescribe('Component', () => {
  describe('<AddUserPage/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(false);
      expect(wrapper.find('Link').exists()).toBe(false);
      expect(wrapper.find('form').exists()).toBe(true);
    });
  });
});
