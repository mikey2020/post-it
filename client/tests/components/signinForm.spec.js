import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import sinon from 'sinon';
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
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(false);
      expect(wrapper.find('Link').exists()).toBe(true);
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('calls onSubmit', () => {
      const mockEvent = {
        preventDefault: () => {},
        addUser: () => {},
      };
      wrapper.find('form').simulate('submit', mockEvent);
      expect(wrapper.find('form').props().onSubmit).toBeA('function');
    });

    it('calls onChange', () => {
      const event = { target: { name: 'bat', value: 'man' } };
      wrapper.find('.username').simulate('change', event);
      expect(wrapper.find('.username').props().onChange).toBeA('function');
    });
  });
});
