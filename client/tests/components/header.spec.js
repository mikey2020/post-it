import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../src/components/Header.jsx';

const setup = () => {
  const props = {
    isAuthenticated: true,
    store: {},
    signOut: () => {},
    notifications: [],
    deleteNotification: () => {},
    getNotifications: () => {}
  };

  const context = {
    router: {
      push: () => Promise.resolve(1)
    }
  };

  return shallow(<Header {...props} {...context} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<Header/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(true);
      expect(wrapper.find('Link').exists()).toBe(false);
    });

    it('should call onClick', () => {
      const event = {
        preventDefault: () => {}
      };
      wrapper.find('.logout-button').simulate('click', event);
      wrapper.instance().logout();
      wrapper.find('.notify').simulate('click', event);
      expect(wrapper.instance().clearNotifications(event)).toBe(true);
      expect(Header.prototype.clearNotifications.calledOnce).toBe(true);
    });
  });
});
