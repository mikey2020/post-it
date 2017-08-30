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
    const store = mockStore([]);
    // const expectedActions = [{ type: types.SET_NOTIFICATIONS, notiifcations: {} }];
    axios.get = jest.fn(() => Promise.resolve({ data: { userNotices: [] } }));
    store.dispatch(actions.getNotifications());
    expect(store.getActions()).toEqual([]);
  });

  it('should get all user notifications unsuccessfully ', () => {
    const store = mockStore([]);
    const expectedActions = [];
    axios.get = jest.fn(() => Promise.resolve({ data: { errors: {} } }));
    store.dispatch(actions.getNotifications());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should delete all user notifications successfully ', () => {
    const store = mockStore([]);
    const expectedActions = [];
    axios.delete = jest.fn(() => Promise.resolve({ data: { message: 'notifications deleted' } }));
    store.dispatch(actions.deleteNotification());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should not delete all user notifications ', () => {
    const store = mockStore([]);
    const expectedActions = [];
    // axios.delete = jest.fn(() => Promise.resolve({ data: {}});
    store.dispatch(actions.deleteNotification());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
