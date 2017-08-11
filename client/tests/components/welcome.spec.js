import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import Welcome from '../../src/components/Welcome';

const enzymeWrapper = mount(<Welcome />);

describe('Components', () => {
  describe('<Welcome/>', () => {
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.find('h2').text()).toBe(' Welcome to Post It');
    })
  });
});