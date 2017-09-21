import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Group } from '../../src/components/home/Group';

const setCurrentGroup = sinon.spy();

const setup = () => {
  const props = {
    groupname: '',
    setCurrentGroup: (() => {}),
    group: {}
  };

  return shallow(<Group{...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<Group/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.find('.group').exists()).toBe(true);
    });

    it('simulates click events', () => {
      wrapper.find('.group').simulate('click',
      { preventDefault: () => {} });
      expect(wrapper.find('.group').props().onClick).toBeA('function');
    });
  });
});
