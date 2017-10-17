/* global jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import axios from 'axios';

import * as actions from '../../src/actions/groupActions';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let mockData = { name: 'fengshui' };
const resData =
  {
    id: 3,
    groupName: 'fengshui',
    groupCreator: 'negan'
  };

describe('Group Actions', () => {
  it('should dispatch appropriate actions when a group is created',
  () => {
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
          groupName: 'fengshui',
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

  it('should dispatch appropriate actions when all user`s groups are added',
  () => {
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

  it('should dispatch appropriate action when a user is added to a group',
  (done) => {
    axios.post = jest.fn(() =>
    Promise.resolve({
      data: {
        message: 'user added successfully'
      }
    }));

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

  it('should dispatch appropriate actions when adding user to an unexisting group',
  () => {
    axios.post = jest.fn(() =>
      Promise.resolve({
        data:
        {
          errors: {
            message: 'group does not exist'
          }
        }
      })
    );

    const store = mockStore({});
    const expectedActions = [
      {
        type: 'ACTION_FAILED',
        payload: {
          status: true,
          actionName: 'ADD_USER_TO_GROUP'
        }
      },
      {
        type: 'ADD_FLASH_MESSAGE',
        message: {
          type: 'error',
          text: 'group does not exist'
        }
      }
    ];
    return store.dispatch(actions.addUserToGroup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch appropriate action when a group is selected', () => {
    const expectedActions = {
      type: 'ADD_CURRENT_GROUP',
      group: {
        name: 'fengshui'
      }
    };

    expect(actions.addCurrentGroup(mockData)).toEqual(expectedActions);
  });

  it('should dispatch appropriate actions when trying to create an already existing group',
  () => {
    axios.post = jest.fn(() => Promise.resolve({
      data: {
        errors: {
          message: 'Group already exists'
        }
      }
    }));

    const store = mockStore({});
    const expectedActions = [
      {
        type: 'ACTION_FAILED',
        payload: {
          status: true,
          actionName: 'ADD_GROUP'
        }
      },
      {
        type: 'ADD_FLASH_MESSAGE',
        message: {
          type: 'error',
          text: 'Group already exists'
        }
      }
    ];
    return store.dispatch(actions.createGroup(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch appropriate actions when creating a group with an invalid group name',
  () => {
    mockData = { name: '' };
    axios.post = jest.fn(() =>
      Promise.resolve({
        data: {
          errors: {
            message: 'Group name is required'
          }
        }
      })
    );

    const store = mockStore({});
    const expectedActions = [
      {
        type: 'ACTION_FAILED',
        payload: {
          status: true,
          actionName: 'ADD_GROUP'
        }
      },
      {
        type: 'ADD_FLASH_MESSAGE',
        message: {
          type: 'error',
          text: 'Group name is required'
        }
      }
    ];
    return store.dispatch(actions.createGroup(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
