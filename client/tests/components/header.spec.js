import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Header } from '../../src/components/Header.jsx';

const setup = () => {
  const props = {
    isAuthenticated: true,
    store: {},
    signout: () => {},
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
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(true);
      expect(wrapper.find('Link').exists()).toBe(false);
    });
  });

  //   it('should call logout', () => {
  //     sinon.spy(Header.prototype, 'logout');
  //     wrapper.find('#logout-button').simulate('click', { preventDefault: () => {} });
  //     expect(Header.prototype.logout.callCount).toEqual(1);
  //   });
  // });
});
