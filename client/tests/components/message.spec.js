import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Message } from '../../src/components/home/Message';

const setup = () => {
  const props = {
    content: '',
    priority: '',
    creator: '',
    date: '',
    readMessage: () => {},
    messageId: 0,
    getUsersWhoReadMessage: () => {}
  };

  return shallow(<Message {...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<Message/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red" />)).toBe(false);
      expect(wrapper.find('ul').exists()).toBe(true);
      expect(wrapper.find('p').exists()).toBe(true);
    });
  });
});
