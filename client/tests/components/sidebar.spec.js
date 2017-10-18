import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
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

const mountProps = {
  groups: [],
  getUserGroups: (() => {}),
  userId: '',
  setCurrentGroup: (() => {})
};


const prevProps = {
  groups: [],
  getUserGroups: (() => {}),
  userId: '',
  setCurrentGroup: (() => {})
};


const wrapper = setup();


describe('Component', () => {
  describe('<Sidebar/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.find('nav').exists()).toBe(false);
      expect(wrapper.find('h5').exists()).toBe(true);
      expect(wrapper.find('Link').exists()).toBe(false);
      expect(wrapper.find('ul').exists()).toBe(true);
    });

    it('should call componentDidMount when component is mounted', () => {
      sinon.spy(Sidebar.prototype, 'componentDidMount');
      mount(<Sidebar {...mountProps} />);
      expect(Sidebar.prototype.componentDidMount.calledOnce).toBe(true);
    });

    it('should call componentDidUpdate when there is a change in props', () => {
      sinon.spy(Sidebar.prototype, 'componentDidUpdate');
      const enzymeWrapper = mount(<Sidebar {...mountProps} />);
      enzymeWrapper.instance().componentDidUpdate(prevProps);
      expect(Sidebar.prototype.componentDidUpdate.calledOnce).toBe(true);
    });
  });
});
