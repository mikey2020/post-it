import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { CreateGroupForm } from '../../src/components/home/CreateGroupForm.jsx';

const createGroup = sinon.spy(() => Promise.resolve());

const setup = () => {
  const props = {
    createGroup: (() => {})
  };

  return shallow(<CreateGroupForm{...props} />);
};

const wrapper = setup();

const mockEvent = {
  preventDefault: () => {}
};

describe('Component', () => {
  describe('<CreateGroupForm/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('calls onChange', () => {
      const event = { target: { name: 'name', value: 'manny' }, errors: {}, isLoading: false };

      wrapper.find('.form-control').simulate('change', event);
      expect(wrapper.find('.form-control').props().onChange).toBeA('function');
    });

    it('calls onSubmit', () => {
      wrapper.find('#create-group-button').simulate('click');
      wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      expect(wrapper.find('form').props().onSubmit).toBeA('function');
    });
  });
});
