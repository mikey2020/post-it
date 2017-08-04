import React from 'react';

import expect from 'expect';

import { shallow } from 'enzyme';

import { SigninForm } from '../../src/components/signin/SigninForm';


const setup = () => {
  const props = {
    validateUser: (() => {})
  };

  return shallow(<SigninForm {...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<SigninForm/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(false);
      expect(wrapper.find('Link').exists()).toBe(false);
      expect(wrapper.find('form').exists()).toBe(true);
    });
  });
});