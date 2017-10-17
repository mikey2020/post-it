import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import { SigninForm } from '../../src/components/signin/SigninForm';

const setup = () => {
  const props = {
    validateUser: (() => {}),
    validateGoogleUser: () => {}
  };

  return shallow(<SigninForm {...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<SigninForm/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.find('.signin-container').exists()).toBe(true);
      expect(wrapper.find('nav').exists()).toBe(false);
      expect(wrapper.find('Link').exists()).toBe(true);
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('should call onSubmit function when form is submitted', () => {
      const mockEvent = {
        preventDefault: () => {},
        addUser: () => {},
        errors: {},
        isLoading: true
      };
      wrapper.find('form').simulate('submit', mockEvent);
      expect(wrapper.find('form').props().onSubmit).toBeA('function');
    });

    it('should call onChange function when user input changes', () => {
      const event = { target: { name: 'bat', value: 'man' } };
      wrapper.find('.username').simulate('change', event);
      expect(wrapper.find('.username').props().onChange).toBeA('function');
    });

    it('should call onBlur function when user input loses focus', () => {
      const event = { target: { name: 'bat', value: 'man' } };
      wrapper.find('.username').simulate('blur', event);
      expect(wrapper.find('.username').props().onBlur).toBeA('function');
    });
  });
});
