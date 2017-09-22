import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { User } from '../../src/components/home/User';

const mockEvent = {
  preventDefault: () => {}
};

const setup = () => {
  const props = {
    username: '',
    addUserToGroup: () => {},
    groupId: 0,
    userId: 0,
    members: [],
    onClick: () => {
      mockEvent.preventDefault();
    }
  };
  return shallow(<User {...props} />);
};

const props = {
  username: '',
  addUserToGroup: () => {},
  groupId: 0,
  userId: 0,
  getMembersOfGroup: () => {},
  members: [],
  onClick: () => {
    mockEvent.preventDefault();
  }
};

const wrapper = setup();


describe('Component', () => {
  describe('<User/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('li').exists()).toBe(true);
      expect(wrapper.find('Link').exists()).toBe(false);
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('calls onClick', () => {
      wrapper.find('.add-user-btn').simulate('click',
      { preventDefault: () => {} });
      expect(wrapper.find('.add-user-btn').props().onClick).toBeA('function');
    });

    it('calls componentDidMount', () => {
      sinon.spy(User.prototype, 'componentDidMount');
      const checkUserIsMember = sinon.spy();
      const enzymeWrapper = mount(<User {...props} />);
      expect(User.prototype.componentDidMount.calledOnce).toBe(true);
      expect(enzymeWrapper.node.props.members).toEqual([]);
      expect(checkUserIsMember).toBeA('function');
    });
  });
});
