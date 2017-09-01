import React from 'react';
import SocketMock from 'socket-io-mock';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Messages } from '../../src/components/home/Messages.jsx';

const setup = () => {

  const props = {
    messages: [],
    group: {},
    postMessage: (() => {}),
    getGroupMessages: (() => {}),
    username: ''
  };
  return shallow(<Messages {...props} />);
};

const wrapper = setup();

describe('Component', () => {
  describe('<Messages/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red" />)).toBe(false);
      expect(wrapper.find('ul').exists()).toBe(true);
      expect(wrapper.find('p').exists()).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(true);
      expect(wrapper.find('form').exists()).toBe(true);
    });

    it('calls onChange', () => {
      const event = { target: { name: 'name', value: 'manny' }, errors: {}, isLoading: false };

      wrapper.find('.materialize-textarea').simulate('change', event);
      expect(wrapper.find('.materialize-textarea').props().onChange).toBeA('function');
    });

    it('calls onSubmit', () => {
      wrapper.find('.post-message-button').simulate('click');
      wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      expect(wrapper.find('form').props().onSubmit).toBeA('function');
    });
  });
});

