/* global jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';
import addUser from '../../src/actions/signupActions';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockData = { username: 'flash', email: 'flash@gmail.com', password: 'flash' };

describe('Signup actions', () => {
  it('creates a success flash message when user has been signed up ', () => {
    const store = mockStore([]);
    const expectedActions = [{ type: types.ADD_FLASH_MESSAGE, message: { type: 'success', text: 'flash signed up successfully' } }];
    axios.post = jest.fn(() => Promise.resolve({ data: { message: 'flash signed up successfully ' } }));
    store.dispatch(addUser(mockData));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
