import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Welcome from '../../src/components/Welcome';

const enzymeWrapper = shallow(<Welcome />);

describe('Components', () => {
  describe('<Welcome/>', () => {
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.find('h1').text()).toBe(' Welcome to Post It');
    });
  });
});
