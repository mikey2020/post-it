/* global jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import axios from 'axios';
import * as actions from '../../src/actions/userActions';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockData = { username: 'mikey' };
// const resData = { id: 1, username: 'mikey', email: 'sa@snow.com' };

describe('User Actions', () => {
  it('creates a success flash message when a user is found', () => {
    axios.post = jest.fn(() => Promise.resolve({ data: { users: { data: [] } } }));
    const store = mockStore([]);
    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE, message: { text: 'user gotten', type: 'success' } }
    ];
    store.dispatch(actions.getUsers(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('checks if a user already exists in the database', () => {
    axios.post = jest.fn(() => Promise.resolve(1));
    expect(actions.checkUserExists(mockData)).toBe(true);
  });

  it('resets user password', () => {
    axios.post = jest.fn(() => Promise.resolve({ data: { message: '' } }));
    expect(actions.resetPassword()).toBe(true);
  });
});

