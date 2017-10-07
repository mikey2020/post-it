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
const resData =
  {
    id: 3,
    groupname: 'fengshui',
    groupCreator: 'negan'
  };

describe('Group Actions', () => {
  it('should create a flash message when a group is created', () => {
    axios.post = jest.fn(() =>
      Promise.resolve(
        {
          data: {
            message: 'group created',
            group: resData,
          }
        }
      )
    );

    const store = mockStore({});
    const expectedActions = [
      {
        type: 'ADD_GROUP',
        group: {
          id: 3,
          groupname: 'fengshui',
          groupCreator: 'negan'
        }
      },
      {
        type: 'ACTION_SUCCESS',
        payload: {
          status: false,
          actionName: 'ADD_GROUP'
        }
      },
      {
        type: 'ADD_FLASH_MESSAGE',
        message: {
          type: 'success',
          text: 'group created'
        }
      }
    ];
    return store.dispatch(actions.createGroup(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should get all groups user is part of successfully', () => {
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: {
          userGroups: [
            {
              id: 1,
              groupName: 'movies',
              groupCreator: 'mike'
            }
          ]
        }
      })
    );

    const store = mockStore({});
    const expectedActions = [
      {
        type: 'ADD_USER_GROUPS',
        groups: [
          {
            id: 1,
            groupName: 'movies',
            groupCreator: 'mike'
          }
        ]
      }
    ];
    return store.dispatch(actions.getUserGroups()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should add user to a group successfully', (done) => {
    axios.post = jest.fn(() =>
    Promise.resolve({ data: { message: 'user added successfully' } }));

    const store = mockStore({});
    const expectedActions = [
      {
        type: types.ADD_FLASH_MESSAGE,
        message:
        {
          text: 'user added successfully',
          type: 'success'
        }
      }
    ];
    store.dispatch(actions.addUserToGroup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should get error message when adding user to a group fails',
  (done) => {
    axios.post = jest.fn(() =>
      Promise.resolve({
        data:
        {
          errors: {
            message: 'group does not exist '
          }
        }
      })
    );

    const store = mockStore({});
    const expectedActions = [];
    store.dispatch(actions.addUserToGroup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should set current group successfully', (done) => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: types.ADD_CURRENT_GROUP,
        group: {
          name: 'fengshui'
        }
      }
    ];
    store.dispatch(actions.setCurrentGroup(mockData));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should catch error when creating of group fails', (done) => {
    axios.post = jest.fn(() => Promise.resolve(1));

    const store = mockStore({});
    const expectedActions = [];
    store.dispatch(actions.createGroup(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should get error message when there is an error', (done) => {
    axios.post = jest.fn(() =>
      Promise.resolve({
        data: {
          message: ''
        }
      })
    );

    const store = mockStore({});
    const expectedActions = [];
    store.dispatch(actions.createGroup(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
