import React from 'react';

import expect from 'expect';

import { shallow } from 'enzyme';

import sinon from 'sinon';

import { CreateGroupForm } from '../../src/components/home/CreateGroupForm';


const setup = () => {
  const props = {
    createGroup: (() => {})
  };

  return shallow(<CreateGroupForm{...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<CreateGroupForm/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.find('form').exists()).toBe(true);
    });

    /* it('simulates click events', () => {
      const onButtonClick = sinon.spy();
      wrapper.find('.btn btn-primary active').simulate('click');
      expect(onButtonClick.calledOnce).to.equal(true);
    }); */
  });
});
