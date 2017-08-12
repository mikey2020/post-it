import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import nock from 'nock';

import expect from 'expect';

import * as actions from '../../src/actions/signinActions';

import * as types from '../../src/actions/types';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

const mockData = { username: 'mike', password: 'negan' };

describe('Signin actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates a error flash message when user is invalid ', () => {
    nock('http://localhost:3000')
      .post('/api/user/signin', mockData)
      .reply(200, { body: { user: { name: 'negan', message: 'negan signed in' } } });

    const store = mockStore({ isAuthenticated: false, user: {} });

    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE, message: { text: 'negan signed in ', type: 'success' } },
      { type: types.SET_USER, user: { name: 'negan', message: 'negan signed in' } }
    ];

    return store.dispatch(actions.validateUser(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates a success flash message when user logs out ', () => {
    const store = mockStore({ isAuthenticated: true, user: { name: 'negan', message: 'negan signed in' } });

    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE, message: { text: 'signout successful ', type: 'success' } },
      { type: types.UNSET_USER }
    ];

    return store.dispatch(actions.signout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
