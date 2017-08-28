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
    expect(actions.checkUserExists(mockData)).toBe({});
  });

  it('sends verification code for resetting password', () => {
    const store = mockStore([]);
    axios.post = jest.fn(() => Promise.resolve({ data: { message: 'Verification code sent' } }));
    expect(store.dispatch(actions.resetPassword(mockData))).toBe({});
  });

  it('verifies code sent to user for resetting password is successful', () => {
    const store = mockStore([]);
    axios.post = jest.fn(() => Promise.resolve({ data: { message: 'password updated successfully' } }));
    expect(store.dispatch(actions.verifyCode({}))).toBe(undefined);
  });

  it('verifies code sent to user for resetting password is unsuccessful', () => {
    const store = mockStore([]);
    axios.post = jest.fn(() => Promise.resolve({ data: { message: null } }));
    expect(store.dispatch(actions.verifyCode({}))).toBe(true);
  });

  it('get members of a group', () => {
    const store = mockStore([]);
    axios.get = jest.fn(() => Promise.resolve({ data: { members: [] } }));
    expect(store.dispatch(actions.getMembersOfGroup(1))).toBe({});
  });
});

