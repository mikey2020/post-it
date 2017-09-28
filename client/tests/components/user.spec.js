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
      expect(wrapper.find('.user-btn').exists()).toBe(true);
      expect(wrapper.find('li').exists()).toBe(true);
      expect(wrapper.find('Link').exists()).toBe(false);
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('should call onClick function when button with class name `add-user-btn` is clicked',
    () => {
      wrapper.find('.add-user-btn').simulate('click',
      { preventDefault: () => {} });
      expect(wrapper.find('.add-user-btn').props().onClick).toBeA('function');
    });

    it('should call componentDidMount function when component is mounted',
    () => {
      sinon.spy(User.prototype, 'componentDidMount');
      const checkUserIsMember = sinon.spy();
      const enzymeWrapper = mount(<User {...props} />);
      expect(User.prototype.componentDidMount.calledOnce).toBe(true);
      expect(enzymeWrapper.node.props.members).toEqual([]);
      expect(checkUserIsMember).toBeA('function');
    });
  });
});
