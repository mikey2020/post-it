import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { SigninForm } from '../../src/components/signin/SigninForm';

const setup = () => {
  const props = {
    validateUser: (() => {})
  };

  return mount(<SigninForm {...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<SigninForm/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(false);
      expect(wrapper.find('Link').exists()).toBe(true);
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('calls onSubmit', () => {
      wrapper.find('#sign-in').simulate('click');
      sinon.spy(SigninForm.prototype, 'onSubmit');
      expect(SigninForm.prototype.onSubmit.calledOnce).toBe(true);
    });

    it('calls isValid', () => {
      sinon.spy(SigninForm.prototype, 'isValid');
      expect(SigninForm.prototype.isValid.calledOnce).toBe(true);
    });
  });
});
