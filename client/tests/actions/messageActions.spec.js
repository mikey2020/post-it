import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import * as actions from '../../src/actions/messageActions';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
// const resData = { name: 'fengshui' };
const groupId = 1;
const mockData = { id: 1, content: 'hello world', messageCreator: 'flash', userId: 1, priority: 'normal' };

describe('Message Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('stores all group messages after action', (done) => {
    nock('http://localhost:3000')
      .get(`/api/group/${groupId}/messages`)
      .reply(200, { body: { posts: mockData } });

    const store = mockStore([]);
    const expectedActions = [
      { type: types.ADD_GROUP_MESSAGES, messages: mockData }
    ];
    store.dispatch(actions.getGroupMessages(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('creates a success flash message when a message has been posted', (done) => {
    nock('http://localhost:3000')
      .post(`/api/group/${groupId}/message`)
      .reply(200, { body: { message: 'message posted to group', data: mockData } });

    const store = mockStore([]);
    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE, message: { text: 'message posted to group', type: 'success' } },
      { type: types.ADD_MESSAGE, message: mockData }
    ];
    store.dispatch(actions.postMessage(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
