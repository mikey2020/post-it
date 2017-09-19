/* global jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import axios from 'axios';
import * as actions from '../../src/actions/groupActions';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockData = { name: 'fengshui' };
const resData = { id: 3, groupname: 'fengshui', groupCreator: 'negan' };

describe('Group Actions', () => {
  it('creates a success flash message when a group is created', (done) => {
    axios.post = jest.fn(() =>
    Promise.resolve(
      { data: { group: { data: resData, message: 'group created' } } }));

    const store = mockStore([]);
    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE,
        message: { text: 'fengshui created successfully', type: 'success' } }
    ];
    store.dispatch(actions.createGroup(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('gets all groups user is part of successfully', (done) => {
    axios.get = jest.fn(() => Promise.resolve({ data: { usergroups: [] } }));

    const store = mockStore([]);
    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE,
        message: { text: 'all groups gotten ', type: 'success' } }
    ];
    store.dispatch(actions.getUserGroups()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should add user to a group successfully', (done) => {
    axios.post = jest.fn(() =>
    Promise.resolve({ data: { message: 'user added successfully' } }));

    const store = mockStore([]);
    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE,
        message: { text: 'user added successfully', type: 'success' } }
    ];
    store.dispatch(actions.addUserToGroup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should set current group successfully', (done) => {
    const store = mockStore({});
    const expectedActions = [
      { type: types.ADD_CURRENT_GROUP, group: { name: 'fengshui' } }
    ];
    store.dispatch(actions.setCurrentGroup(mockData));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
