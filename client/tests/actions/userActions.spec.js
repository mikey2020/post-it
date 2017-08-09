import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import nock from 'nock';

import expect from 'expect';

import * as actions from '../../src/actions/userActions';

import * as types from '../../src/actions/types';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

const mockData = { username: 'mikey' };

const resData = { id: 1, username: 'mikey', email: 'sa@snow.com' };

describe('User Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates a success flash message when a user is found', () => {
    nock('http://localhost:3000')
      .post('/api/user', mockData)
      .reply(200, { body: { users: { data: resData } } });

    const store = mockStore({ state: [] });
    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE, message: { text: 'user gotten', type: 'success' } }
    ];
    store.dispatch(actions.getUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

