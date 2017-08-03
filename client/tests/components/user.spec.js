import React from 'react';

import expect from 'expect';

import { shallow } from 'enzyme';

import { User } from '../../src/components/home/User';


const setup = () => {
  const props = {
    username: '',
    addUserToGroup: '',
    groupId: ''
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
      expect(wrapper.find('a').exists()).toBe(true);
    });
  });
});
