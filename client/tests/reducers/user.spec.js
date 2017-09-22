import expect from 'expect';

import reducer from '../../src/reducers/user';
import * as types from '../../src/actions/types';


describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
        { isAuthenticated: false, user: {} }
    );
  });
  it('should return  a new state for case `SET_USER` ', () => {
    expect(reducer({ isAuthenticated: false, user: {} }, {
      type: types.SET_USER,
      user: { name: 'mike', message: 'mike signed in' }

    })).toEqual(
      { isAuthenticated: true,
        user: { message: 'mike signed in', name: 'mike' } }
    );
  });
  it('should return  a new state for case `UNSET_USER` ', () => {
    expect(reducer({ isAuthenticated: true,
      user: { message: 'mike signed in', name: 'mike' } }, {
        type: types.UNSET_USER,
        user: {}
      })).toEqual(
      { isAuthenticated: false,
        user: {} }
    );
  });
});
