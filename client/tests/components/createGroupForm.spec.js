import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { CreateGroupForm } from '../../src/components/home/CreateGroupForm.jsx';

const checkGroupExists = sinon.spy();
const groupExists = sinon.spy();

const setup = () => {
  const props = {
    createGroup: (() => Promise.resolve(1)),
    checkGroupExists,
    groupExists
  };

  return shallow(<CreateGroupForm{...props} />);
};

const wrapper = setup();

describe('Component', () => {
  describe('<CreateGroupForm/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('calls onChange', () => {
      const event = { target: { name: 'name', value: 'manny' },
        errors: {},
        isLoading: false };
      wrapper.find('.form-control').simulate('change', event);
      expect(wrapper.find('.form-control').props().onChange).toBeA('function');
    });

    it('calls onBlur', () => {
      wrapper.find('#usr').simulate('blur',
       { target: { name: 'name', value: 'manny' } });
      wrapper.instance().checkGroupExists();
      wrapper.props().groupExists();
      expect(groupExists.calledOnce).toBe(true);
      expect(checkGroupExists).toBeA('function');
    });

    it('calls onSubmit', () => {
      wrapper.find('#create-group-button').simulate('click');
      wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      expect(wrapper.find('form').props().onSubmit).toBeA('function');
    });
  });
});
