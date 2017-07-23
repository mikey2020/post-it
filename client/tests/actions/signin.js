import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import nock from 'nock';

import expect from 'expect'; 

import * as actions from '../../src/actions/signinActions';

import * as types from '../../src/actions/types';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('Async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    nock('')
      .get('/api/user/signin')
      .reply(200, { body: { message: ['do something'] } });

    const expectedActions = [
      { type: types.FETCH_TODOS_REQUEST },
      { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something'] } }
    ];

    const store = mockStore({ todos: [] });

    return store.dispatch(actions.fetchTodos()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});