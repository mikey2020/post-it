/* global jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/messageActions';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockData = { id: 1,
  content: 'hello world',
  messageCreator: 'flash',
  userId: 1,
  priority: 'normal' };

describe('Message Actions', () => {
  it('stores all group messages after action', (done) => {
    axios.get = jest.fn(() => Promise.resolve({ data: { messages: [{}] } }));
    const store = mockStore([]);
    const expectedActions = [
      { type: types.ADD_GROUP_MESSAGES, messages: mockData }
    ];
    store.dispatch(actions.getGroupMessages()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('creates a success flash message when a message has been posted',
  (done) => {
    axios.post = jest.fn(() =>
    Promise.resolve({ data: { message: '', postedMessage: mockData } }));
    const store = mockStore([]);
    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE,
        message: { text: 'message posted to group', type: 'success' } },
      { type: types.ADD_MESSAGE, message: mockData }
    ];
    store.dispatch(actions.postMessage(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('reads a message successfully', () => {
    axios.post = jest.fn(() =>
    Promise.resolve({ data: { message: '', readMessage: {} } }));
    const store = mockStore([]);
    store.dispatch(actions.readMessage());
    expect(store.getActions()).toEqual([]);
  });

  it('get users who read a message', () => {
    axios.post = jest.fn(() => Promise.resolve({ data: { users: [] } }));
    const store = mockStore([]);
    store.dispatch(actions.getUsersWhoReadMessage(1));
    expect(store.getActions()).toEqual([]);
  });

  it('get number of messages user has not read', () => {
    axios.get = jest.fn(() => Promise.resolve({ data: { unRead: [] } }));
    const store = mockStore([]);
    store.dispatch(actions.getUnreadMessages(1));
    expect(store.getActions()).toEqual([]);
  });
});
