/* global jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import * as actions from '../../src/actions/messageActions';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockData = {
  id: 1,
  content: 'hello world',
  messageCreator: 'flash',
  userId: 1,
  priority: 'normal'
};

describe('Message Actions', () => {
  it('should get all group messages after action is dispatched', () => {
    axios.get = jest.fn(() =>
      Promise.resolve({ data:
      {
        messages: [mockData]
      }
      })
    );
    const store = mockStore({});
    const expectedActions = [
      { type: types.ADD_GROUP_MESSAGES,
        messages: [mockData]
      }
    ];
    return store.dispatch(actions.getGroupMessages()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return a message object when a message has been posted',
  (done) => {
    axios.post = jest.fn(() =>
      Promise.resolve({
        data: {
          message: '',
          postedMessage: mockData
        }
      })
    );
    const store = mockStore({});
    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE,
        message: {
          text: 'message posted to group',
          type: 'success'
        }
      },
      {
        type: types.ADD_MESSAGE,
        message: mockData
      }
    ];
    store.dispatch(actions.postMessage(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should mark a message as read successfully', () => {
    axios.post = jest.fn(() =>
      Promise.resolve({
        data: {
          message: 'user read this message',
          readMessage: {
            id: 2,
            content: 'test-post',
            priority: 'normal',
            messageCreator: 'johnny',
            groupId: 1,
            userId: 1,
          }
        }
      })
    );
    const store = mockStore({});
    store.dispatch(actions.readMessage(1)).then(() => {
      expect(store.getActions()).toEqual([]);
    });
  });

  it('should get users who have read a message', () => {
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: {
          users: [
            {
              id: 1,
              username: 'naruto',
              email: 'naruto@konoha.com',
              phoneNumber: '0902345957'
            }
          ]
        }
      })
    );
    const store = mockStore({});
    const expectedActions = [
      {
        type: 'SET_USERS_WHO_READ_MESSAGE',
        users: [
          {
            id: 1,
            username: 'naruto',
            email: 'naruto@konoha.com',
            phoneNumber: '0902345957'
          }
        ]
      }
    ];
    return store.dispatch(actions.getUsersWhoReadMessage(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should get number of messages user has not read', () => {
    axios.get = jest.fn(() =>
      Promise.resolve({
        data:
        {
          unRead: []
        }
      })
    );
    const store = mockStore({});
    store.dispatch(actions.getUnreadMessages(1));
    expect(store.getActions()).toEqual([]);
  });
});
