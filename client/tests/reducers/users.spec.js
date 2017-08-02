import expect from 'expect';

import reducer from '../../src/reducers/users';

import * as types from '../../src/actions/types';


describe('Users reducer', () => {
  it('should return the initial state', () => {
    expect(reducer([], {})).toEqual([]);
  });

  it('should return  a new state for case `SET_USERS` ', () => {
    expect(reducer([], {
      type: types.SET_USERS,
      users: [{ id: 1, username: 'mikey' }]

    })).toEqual(
       [{ id: 1, username: 'mikey' }]
    );
  });
});
