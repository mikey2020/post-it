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

  return shallow(<Header {...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<Header/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.find('.brand-logo').exists()).toBe(true);
      expect(wrapper.find('nav').exists()).toBe(true);
      expect(wrapper.find('Link').exists()).toBe(false);
    });

    it('should call logout function when user clicks logout button', () => {
      const event = {
        preventDefault: () => {},
      };
      Object.defineProperty(window.location, 'href', {
        writable: true,
        value: '/signup'
      });
      wrapper.instance().clearNotifications(event);
      wrapper.find('.logout-button').simulate('click', event);
      wrapper.instance().logout(event);
    });
  });
});
