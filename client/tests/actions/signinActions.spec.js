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

    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE, message: { text: 'Invalid Signin Parameters', type: 'error' } }
    ];

    const store = mockStore({ isAuthenticated: false, user: {} });

    return store.dispatch(actions.validateUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
