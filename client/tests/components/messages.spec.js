import React from 'react';

import expect from 'expect';

import { shallow } from 'enzyme';

import { Messages } from '../../src/components/home/Messages';


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


xdescribe('Component', () => {
  describe('<Message/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red" />)).toBe(false);
      expect(wrapper.find('li').exists()).toBe(true);
      expect(wrapper.find('ul').exists()).toBe(true);
      expect(wrapper.find('p').exists()).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(true);
      expect(wrapper.find('form').exists()).toBe(true);
    });
  });
});
