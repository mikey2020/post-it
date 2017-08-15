/* global jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';
import MockLocalStorage from 'mock-localstorage';
import * as actions from '../../src/actions/signinActions';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockData = { username: 'flash', password: 'flash' };
const mockStorage = new MockLocalStorage();
const token = 'token';

window.localStorage = mockStorage;

describe('Signin actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates an error flash message when user is invalid ', () => {
    moxios.stubRequest('/api/user/signin', {
      status: 400,
      response: {
        data: {

        }
      }
    });
    const store = mockStore({ isAuthenticated: false, user: {} });
    const expectedActions = [{ type: 'ADD_FLASH_MESSAGE', message: { type: 'error', text: 'Invalid Signin Parameters' } }];
    axios.post = jest.fn(() => Promise.resolve(1));
    store.dispatch(actions.validateUser()).then((data) => {
      console.log('jfkojfd', data);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates a success flash message when user is valid ', () => {
    moxios.stubRequest('/api/user/signin', {
      status: 200,
      response: {
        token,
        user: { name: 'flash', message: 'flash signed in' },
        message: 'login successful'
      }
    });


    const store = mockStore({ isAuthenticated: false, user: {} });
    const expectedActions = [{ type: 'ADD_FLASH_MESSAGE', message: { type: 'success', text: 'welcome flash' } }];
    axios.post = jest.fn(() => Promise.resolve({ data: { user: { name: 'flash', message: 'flash signed in' } } }));
    store.dispatch(actions.validateUser(mockData));
       // console.log('++++++========>>>>>');
    expect(store.getActions()).toEqual(expectedActions);
    // expect(store.dispatch(actions.validateUser(mockData))).toEqual(expectedActions);
  });

  it('creates a success flash message when user logs out ', () => {
    mockStorage.removeItem('jwtToken');
    const store = mockStore({ isAuthenticated: true, user: { name: 'negan', message: 'negan signed in' } });

    const expectedActions = [
      { type: types.UNSET_USER },
      { type: types.ADD_FLASH_MESSAGE, message: { type: 'success', text: 'signout successful' } }
    ];

    store.dispatch(actions.signout());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
