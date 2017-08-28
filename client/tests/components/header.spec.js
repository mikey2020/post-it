import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Header } from '../../src/components/Header';


const setup = () => {
  const props = {
    user: {
      isAuthenticated: false
    },
    store: {},
    signout: () => {}
  };
  return shallow(<Header {...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<Header/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(true);
      expect(wrapper.find('Link').exists()).toBe(true);
    });

    it('should call logout', () => {
      const mockEvent = {
        preventDefault: () => {}
      };
      wrapper.find('#logout-button').simulate('click');
      expect(wrapper.find('#logout-button').callCount).toEqual(1);
    });
  });
});
