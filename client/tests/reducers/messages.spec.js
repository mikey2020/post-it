import expect from 'expect';

import reducer from '../../src/reducers/Messages';

import * as types from '../../src/actions/types';


describe('Messages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should return  a new state for case `ADD_GROUP_MESSAGES` ', () => {
    expect(reducer([], {
      type: types.ADD_GROUP_MESSAGES,
      messages: [{ id: 1, content: 'tarly house', groupId: 3, priority: 'normal', messageCreator: 'mike' }]

    })).toEqual(
       [{ id: 1, content: 'tarly house', groupId: 3, priority: 'normal', creator: 'mike' }]
    );
  });
});
