import React from 'react';

import expect from 'expect';

import { shallow } from 'enzyme';

import { Message } from '../../src/components/home/Message';


const setup = () => {
  const props = {
    content: ''

  };

  return shallow(<Message {...props} />);
};

const wrapper = setup();


xdescribe('Component', () => {
  describe('<Message/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red" />)).toBe(false);
      expect(wrapper.find('li').exists()).toBe(true);
      expect(wrapper.find('ul').exists()).toBe(true);
      expect(wrapper.find('p').exists()).toBe(true);
    });
  });
});
