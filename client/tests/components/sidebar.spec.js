import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Sidebar } from '../../src/components/home/Sidebar';


const setup = () => {
  const props = {
    groups: [],
    getUserGroups: (() => {}),
    userId: '',
    setCurrentGroup: (() => {})
  };

  return shallow(<Sidebar {...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<Sidebar/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(false);
      expect(wrapper.find('h4').exists()).toBe(true);
      expect(wrapper.find('Link').exists()).toBe(false);
      expect(wrapper.find('ul').exists()).toBe(true);
    });

    it('should call component will mount', () => {
      wrapper.find('form').simulate('submit', { getUserGroups: () => {} });
      expect(Sidebar.prototype.componentDidMount.callCount).toBe(true);
    });

    it('should call component will receive props mount', () => {
      expect(Sidebar.prototype.componentDidUpdate.callCount).toBe(true);
    });
  });
});
