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

const props = {
  groups: [],
  getUserGroups: (() => {}),
  userId: '',
  setCurrentGroup: (() => {})
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

    it('calls componentDidMount', () => {
      sinon.spy(Sidebar.prototype, 'componentDidMount');
      const enzymeWrapper = mount(<Sidebar {...props} />);
      expect(Sidebar.prototype.componentDidMount.calledOnce).toBe(true);
      expect(enzymeWrapper.node.props.groups).toEqual([]);
    });

    // it('calls componentDidUpdate', () => {
    //   sinon.spy(Sidebar.prototype, 'componentDidUpdate');
    //   const enzymeWrapper = mount(<Sidebar {...props} />);
    //   enzymeWrapper.node.props.groups[0] = { groupname: 'new group' };
    //   expect(Sidebar.prototype.componentDidUpdate.calledOnce).toBe(true);
    //   expect(enzymeWrapper.node.props.groups).toEqual([{ groupname: 'new group' }]);
    // });
  });
});
