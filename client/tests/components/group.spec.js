import React from 'react';

import expect from 'expect';

import { shallow } from 'enzyme';

import sinon from 'sinon';

import { Group } from '../../src/components/home/Group';


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
      expect(wrapper.find('p').exists()).toBe(true);
    });

    /* it('simulates click events', () => {
      const onButtonClick = sinon.spy();
      wrapper.find('.btn btn-primary active').simulate('click');
      expect(onButtonClick.calledOnce).to.equal(true);
    }); */
  });
});
