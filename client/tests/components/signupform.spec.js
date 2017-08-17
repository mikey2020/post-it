import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { SignupForm } from '../../src/components/signup/SignupForm';

const setup = () => {
  const props = {
    addUser: (() => {})
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
      // wrapper.find('#signup-button').simulate('click');
      const signupButton = wrapper.find('#signup-button');
      const onSubmitSpy = sinon.spy(wrapper.instance(), 'onSubmit');
      wrapper.update();
      const mockEvent = {
        preventDefault: () => {}
      };
      signupButton.simulate('click', mockEvent);
      expect(onSubmitSpy.calledOnce).toBe(true);
    });

    it('calls onChange', () => {
      //sinon.spy(SignupForm.prototype, 'onChange');
      //expect(SignupForm.prototype.onChange.calledOnce).toBe(true);
    });
  });
});
