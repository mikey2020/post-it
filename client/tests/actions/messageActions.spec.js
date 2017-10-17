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
      {
        type: types.ADD_GROUP_MESSAGES,
        messages: [mockData]
      }
    ];
    return store.dispatch(actions.getGroupMessages(1, 10, 5)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return a message object when a message has been posted',
  () => {
    axios.post = jest.fn(() =>
      Promise.resolve({
        data: {
          message: 'message posted to group',
          postedMessage: mockData
        }
      })
    );
    const store = mockStore({});
    const expectedActions = [
      {
        type: 'ADD_MESSAGE',
        message: mockData
      }
    ];
    return store.dispatch(actions.postMessage(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return a success message and a message object when a message has been read',
  () => {
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
    const expectedActions = [
      {
        type: 'ACTION_SUCCESS',
        payload: {
          status: false,
          actionName: 'USER_READ_MESSAGE'
        }
      }
    ];
    return store.dispatch(actions.readMessage(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
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

  it('should get number of messages a user has not read', () => {
    const expectedActions = [
      {
        type: 'ACTION_SUCCESS',
        payload: {
          status: false,
          actionName: 'SET_UNREAD_MESSAGES'
        }
      },
      {
        type: 'SET_UNREAD_MESSAGES',
        messages: [
          {
            id: 4,
            content: 'sup',
            priority: 'normal',
            messageCreator: 'john',
            groupId: 1,
            userId: 3,
            createdAt: '2017-09-25T18:39:51.178Z',
            updatedAt: '2017-09-25T18:39:51.178Z'
          }
        ]
      }
    ];
    axios.get = jest.fn(() =>
      Promise.resolve({
        data:
        {
          messages: [
            {
              id: 4,
              content: 'sup',
              priority: 'normal',
              messageCreator: 'john',
              groupId: 1,
              userId: 3,
              createdAt: '2017-09-25T18:39:51.178Z',
              updatedAt: '2017-09-25T18:39:51.178Z'
            }
          ]
        }
      })
    );
    const store = mockStore({});
    return store.dispatch(actions.getUnreadMessages(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
