import React from 'react';
import expect from 'expect';

import { shallow } from 'enzyme';
import { AllUsers } from '../../src/components/home/AllUsers.jsx';

const setup = () => {
  const props = {
    users: [],
    groupId: '',
    contextTypes: {},
    addUserToGroup: () => {},
  };

  return shallow(<AllUsers {...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<AllUsers/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(false);
      expect(wrapper.find('Link').exists()).toBe(false);
      expect(wrapper.find('ul').exists()).toBe(false);
    });
  });
});
