/* global jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';
import MockLocalStorage from 'mock-localstorage';
import addUser from '../../src/actions/signupActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockData = { username: 'flash',
  email: 'flash@gmail.com',
  password: 'flash' };
const mockStorage = new MockLocalStorage();
const token = 'token';

window.localStorage = mockStorage;

describe('Signup actions', () => {
  it('creates a success flash message when user has been signed up ', () => {
    const store = mockStore([]);
    const expectedActions = [];
    axios.post = jest.fn(() =>
    Promise.resolve({ data: { message: 'flash signed up successfully ',
      userToken: token } }));
    store.dispatch(addUser(mockData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates a error flash message when user already exists', () => {
    const store = mockStore([]);
    axios.post = jest.fn(() =>
    Promise.resolve({ data: { errors: { message: 'user already exists' } } }));
    store.dispatch(addUser(mockData));
    expect(store.getActions()).toEqual([]);
  });
});
