/* global jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import * as actions from '../../src/actions/notificationAction';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Notification actions', () => {
  it('should get all user notifications successfully', () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: types.SET_NOTIFICATIONS,
        notiifcations: [
          'naruto posted a message to a group which you are a member'
        ]
      }
    ];
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: { notices: [
          {
            id: 1,
            groupId: 1,
            event: 'naruto posted a message to a group which you are a member'
          }
        ] }
      }
    ));
    store.dispatch(actions.getNotifications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should get no notifications', () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: 'ACTION_FAILED',
        payload: {
          status: true,
          actionName: 'SET_NOTIFICATIONS'
        }
      }
    ];
    axios.get = jest.fn(() => Promise.resolve(
      {
        data: {
          message: 'No notification found'
        }
      }
    ));
    return store.dispatch(actions.getNotifications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should get no user notification when api call fails', () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: 'ACTION_FAILED',
        payload: {
          status: true,
          actionName: 'SET_NOTIFICATIONS'
        }
      }
    ];
    axios.get = jest.fn(() => Promise.resolve(1));
    return store.dispatch(actions.getNotifications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should delete all user notifications successfully ', () => {
    const store = mockStore({
      notifications: [
        'naruto posted a message to a group which you are a member',
        'sasuke posted a message to a group which you are a member'
      ]
    });
    const expectedActions = [
      {
        type: 'ACTION_SUCCESS',
        payload: {
          status: false,
          actionName: 'REMOVE_NOTIFICATIONS'
        }
      }
    ];
    axios.delete = jest.fn(() =>
      Promise.resolve({
        data: {
          message: 'All notifications deleted'
        }
      })
    );
    return store.dispatch(actions.deleteNotification()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not delete all user notifications successfully', () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: 'ACTION_FAILED',
        payload: {
          status: true,
          actionName: 'REMOVE_NOTIFICATIONS'
        }
      }
    ];
    axios.delete = jest.fn(() => Promise.resolve(1));
    return store.dispatch(actions.deleteNotification()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
