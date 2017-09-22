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

describe('User Actions', () => {
  it('should create a success flash message when a user is found', () => {
    axios.get = jest.fn(() => Promise.resolve({ data: { users: [] } }));
    const store = mockStore([]);
    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE,
        message: { text: 'user gotten', type: 'success' } }
    ];
    store.dispatch(actions.getUsers(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should check if a user already exists in the database', () => {
    const store = mockStore([]);
    axios.post = jest.fn(() => Promise.resolve(1));
    actions.checkUserExists(mockData);
    expect(store.getActions()).toEqual([]);
  });

  it('should send a verification code for resetting password', () => {
    const store = mockStore([]);
    axios.post = jest.fn(() =>
    Promise.resolve({ data: { message: 'Verification code sent' } }));
    store.dispatch(actions.sendVerificationCode(mockData));
    expect(store.getActions()).toEqual([]);
  });

  it('should verify code sent to user for resetting password is successful',
  () => {
    const store = mockStore([]);
    axios.post = jest.fn(() =>
    Promise.resolve({ data: { message: 'password updated successfully' } }));
    store.dispatch(actions.verifyCode({}));
    expect(store.getActions()).toEqual([]);
  });

  it('should verify code for resetting password is invalid', () => {
    const store = mockStore([]);
    axios.post = jest.fn(() => Promise.resolve({ data: { message: null } }));
    store.dispatch(actions.verifyCode({}));
    expect(store.getActions()).toEqual([]);
  });

  it('should get members of a group', () => {
    const store = mockStore([]);
    axios.get = jest.fn(() => Promise.resolve({ data: { members: [] } }));
    store.dispatch(actions.getMembersOfGroup(1));
    expect(store.getActions()).toEqual([]);
  });
});

