/* global jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';
import MockLocalStorage from 'mock-localstorage';
import * as actions from '../../src/actions/signinActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockData = { username: 'flash', password: 'flash' };
const mockStorage = new MockLocalStorage();
const token = 'token';

window.localStorage = mockStorage;

describe('Signin actions', () => {
  it('creates an error flash message when user is invalid ', () => {
    const store = mockStore({ isAuthenticated: false, user: {} });
    const expectedActions = [{ type: 'ADD_FLASH_MESSAGE',
      message: { type: 'error', text: 'Invalid Signin Parameters' } }];
    axios.post = jest.fn(() => Promise.resolve(1));
    store.dispatch(actions.validateUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates a success flash message when user is valid ', () => {
    const store = mockStore({ isAuthenticated: false, user: {} });
    const expectedActions = [];
    axios.post = jest.fn(() => Promise.resolve({ data:
       { user: { name: 'flash', message: 'flash signed in' } } }));
    store.dispatch(actions.validateUser(mockData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates a success flash message when user logs out ', () => {
    mockStorage.removeItem('jwtToken');
    const store = mockStore({ isAuthenticated: true,
      user: { name: 'negan', message: 'negan signed in' } });

    const expectedActions = [{ type: 'UNSET_USER' },
      { type: 'ACTION_SUCCESS',
        payload: { status: false, actionName: 'SIGNOUT_SUCCESSFUL' } },
      { type: 'ADD_FLASH_MESSAGE',
        message: { type: 'success', text: 'signout successful' } }];

    store.dispatch(actions.signOut());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
