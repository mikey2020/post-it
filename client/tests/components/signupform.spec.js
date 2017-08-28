import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SignupForm } from '../../src/components/signup/SignupForm';

const setup = () => {
  const props = {
    addUser: () => {},
    onChange: () => {},
    onSubmit: () => {}
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

    it('calls onSubmit', () => {
      const mockEvent = {
        preventDefault: () => {},
        addUser: () => {},
      };
      wrapper.find('form').simulate('submit', mockEvent);
      expect(wrapper.find('form').props().onSubmit).toBeA('function');
    });

    it('calls onChange', () => {
      const event = { target: { name: 'super', value: 'man' } };
      wrapper.find('.username').simulate('change', event);
      expect(wrapper.find('.username').props().onChange).toBeA('function');
    });
  });
});
