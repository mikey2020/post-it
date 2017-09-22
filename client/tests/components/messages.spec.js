import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Messages } from '../../src/components/home/Messages.jsx';
import { MessageForm } from '../../src/components/home/MessageForm.jsx';

const setup = () => {
  const props = {
    messages: [],
    group: {},
    postMessage: (() => {}),
    addMessage: () => {},
    getGroupMessages: (() => {}),
    username: ''
  };
  return shallow(<Messages {...props} />);
};

const formSetup = () => {
  const props = {
    message: '',
    onChange: () => {},
    onSubmit: () => {},
    priority: 'normal',
    priorityLevel: 3,
    handlePriority: () => {},
    className: ''
  };
  return shallow(<MessageForm {...props} />);
};

const wrapper = setup();
const formWrapper = formSetup();

describe('Component', () => {
  describe('<Messages/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red" />)).toBe(false);
      expect(wrapper.find('ul').exists()).toBe(true);
      expect(wrapper.find('p').exists()).toBe(true);
      expect(wrapper.find('nav').exists()).toBe(true);
      expect(wrapper.find('form').exists()).toBe(false);
    });

    it('should call onChange when entering input', () => {
      const event = { target: { name: 'bat', value: 'man' } };
      const priorityEvent = { target: { priorityLevel: 5, value: 7 } };
      wrapper.find('.post-message').simulate('change', event);
      formWrapper.find('.priority-level').simulate('change', priorityEvent);
      wrapper.instance().handlePriority(priorityEvent);
      expect(formWrapper.find('.message-input')
      .props().onChange).toBeA('function');
    });

    it('calls onSubmit', () => {
      const mockEvent = {
        preventDefault: () => {},
        postMessage: () => {},
        errors: {},
        isLoading: true
      };
      wrapper.find('.post-message').simulate('submit', mockEvent);
      expect(wrapper.find('.post-message').props().onSubmit).toBeA('function');
    });

    it('calls viewArchived function', () => {
      const viewArchived = sinon.spy();
      wrapper.instance().viewArchived({ preventDefault: () => {} });
      expect(viewArchived.callCount).toEqual(0);
    });
  });
});

