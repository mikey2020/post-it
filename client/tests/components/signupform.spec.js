import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { SignupForm } from '../../src/components/signup/SignupForm';

const setup = () => {
  const props = {
    validateUser: (() => {})
  };

  return mount(<SignupForm {...props} />);
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

    it('calls onSubmit', () => {
      wrapper.find('#signup-button').simulate('click');
      //sinon.spy(SignupForm.prototype, 'onSubmit');
      //expect(SignupForm.prototype.onSubmit.calledOnce).toBe(true);
    });

    it('calls onChange', () => {
      //sinon.spy(SignupForm.prototype, 'onChange');
      //expect(SignupForm.prototype.onChange.calledOnce).toBe(true);
    });
  });
});
