import expect from 'expect';

import reducer from '../../src/reducers/currentGroup';

import * as types from '../../src/actions/types';


describe('CurrentGroup reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
         { id: '', name: '', creator: '' }
    );
  });

  it('should return  a new state for case `ADD_CURRENT_GROUP` ', () => {
    expect(reducer([], {
      type: types.ADD_CURRENT_GROUP,
      group: { id: 1, name: 'tarly house', creator: 'mikey' }

    })).toEqual(
       { creator: 'mikey', id: 1, name: 'tarly house' }
    );
  });
});
