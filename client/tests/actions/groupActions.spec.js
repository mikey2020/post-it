import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import nock from 'nock';

import expect from 'expect';

import * as actions from '../../src/actions/groupActions';

import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockData = { name: 'fengshui' };
const resData = { id: 3, groupname: 'fengshui', groupCreator: 'negan' };

describe('Group Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates a success flash message when a group is created', (done) => {
    nock('http://localhost:3000')
      .post('/api/group', mockData)
      .reply(200, { body: { group: { message: 'fengshui created successfully', data: resData } } });

    const store = mockStore([]);
    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE, message: { text: 'fengshui created successfully', type: 'success' } }
    ];
    store.dispatch(actions.createGroup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
