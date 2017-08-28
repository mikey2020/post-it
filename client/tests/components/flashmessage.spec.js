import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { FlashMessage } from '../../src/components/flash/FlashMessage.jsx';


const setup = () => {
  const props = {
    message: {},
    deleteFlashMessage: (() => {})
  };

  return shallow(<FlashMessage {...props} />);
};

const wrapper = setup();


describe('Component', () => {
  describe('<FlashMessage/>', () => {
    it('should render self and subcomponents', () => {
      expect(wrapper.contains(<div className="red darken-4" />)).toBe(false);
      expect(wrapper.find('input').exists()).toBe(false);
      expect(wrapper.find('button').exists()).toBe(true);
    });
  });
});
