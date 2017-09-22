/* global jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';
import MockLocalStorage from 'mock-localstorage';

import addUser from '../../src/actions/addUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockData = { username: 'flash',
  email: 'flash@gmail.com',
  phoneNumber: '09012345678',
  password: 'flash' };
const mockStorage = new MockLocalStorage();
const token = 'token';

window.localStorage = mockStorage;

describe('Signup actions', () => {
  it('should create a success flash message when user has been signed up ',
  (done) => {
    const initialState = {
      isAuthenticated: false,
      user: {}
    };
    const store = mockStore(initialState);
    const expectedActions = [{}];
    axios.post = jest.fn(() =>
    Promise.resolve({ data: { message: 'flash signed up successfully',
      userToken: token } }));
    Object.defineProperty(window.location, 'assign', {
      writable: true,
      value: '/home'
    });
    store.dispatch(addUser(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should create a error flash message when user already exists', () => {
    const store = mockStore([]);
    axios.post = jest.fn(() =>
    Promise.resolve({ data: { errors: { message: 'user already exists' } } }));
    store.dispatch(addUser(mockData));
    expect(store.getActions()).toEqual([]);
  });
});
