import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Sidebar } from '../../src/components/home/Sidebar';

const componentDidMount = sinon.spy();

const setup = () => {
  const props = {
    groups: [],
    getUserGroups: (() => {}),
    userId: '',
    setCurrentGroup: (() => {})
  };

  return shallow(<Sidebar {...props} />);
};

let wrapper = setup();


describe('Component', () => {
  describe('<Sidebar/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('nav').exists()).toBe(false);
      expect(wrapper.find('h4').exists()).toBe(true);
      expect(wrapper.find('Link').exists()).toBe(false);
      expect(wrapper.find('ul').exists()).toBe(true);
    });

    // it('should call component did mount', () => {
    //   // wrapper = mount(<Sidebar />);
    //   expect(componentDidMount.calledOnce).toBe(true);
    // });

    // it('should call component did update mount', () => {
    //   expect(Sidebar.prototype.componentDidUpdate.callCount).toBe(true);
    // });
  });
});
