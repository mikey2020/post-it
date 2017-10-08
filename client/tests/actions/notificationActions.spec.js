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
        notiifcations: ['naruto posted a message to a group which you are a member']
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
    const expectedActions = [];
    axios.get = jest.fn(() => Promise.resolve(
      {
        data: {
          message: 'No notification found'
        }
      }
    ));
    store.dispatch(actions.getNotifications());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should get no user notifications when api call fails', () => {
    const store = mockStore({});
    const expectedActions = [];
    axios.get = jest.fn(() => Promise.resolve(1));
    store.dispatch(actions.getNotifications()).then(() => {
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
    const expectedActions = [];
    axios.delete = jest.fn(() =>
      Promise.resolve({
        data: {
          message: 'notifications deleted'
        }
      })
    );
    store.dispatch(actions.deleteNotification());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should not delete all user notifications successfully', () => {
    const store = mockStore({});
    const expectedActions = [];
    store.dispatch(actions.deleteNotification());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
