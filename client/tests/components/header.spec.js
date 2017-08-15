import React from 'react';

import expect from 'expect';

import { shallow } from 'enzyme';

import { Header } from '../../src/components/Header';

import { signout } from '../../src/actions/signinActions';

const setup = () => {
  const props = {
    user: {
      isAuthenticated: false
    },

    signout: signout()
  };
  return shallow(<Header {...props} />);
};

const wrapper = setup();


xdescribe('Component', () => {
  describe('<Header/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(true);
      expect(wrapper.find('Link').exists()).toBe(true);
    });
  });
});
