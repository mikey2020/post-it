import React from 'react';

import expect from 'expect';

import { shallow } from 'enzyme';

import { SignupForm } from '../../src/components/signup/SignupForm';


const setup = () => {
  const props = {
    validateUser: (() => {})
  };

  return shallow(<SignupForm {...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<SignupForm/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(false);
      expect(wrapper.find('input').exists()).toBe(true);
      expect(wrapper.find('form').exists()).toBe(true);
    });
  });
});
