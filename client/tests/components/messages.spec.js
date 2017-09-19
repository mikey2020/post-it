import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Messages } from '../../src/components/home/Messages.jsx';

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

const wrapper = setup();

describe('Component', () => {
  describe('<Messages/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red" />)).toBe(false);
      expect(wrapper.find('ul').exists()).toBe(true);
      expect(wrapper.find('p').exists()).toBe(true);
      expect(wrapper.find('nav').exists()).toBe(true);
      expect(wrapper.find('form').exists()).toBe(false);
    });

    it('should call onChange', () => {
      const event = { target: { name: 'name', value: 'manny' },
        errors: {},
        isLoading: false };

      expect(wrapper.instance().onChange).toBeA('function');
    });
  });
});

