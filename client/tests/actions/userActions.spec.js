/* global jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import axios from 'axios';

import * as actions from '../../src/actions/userActions';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockData = {
  username: 'mikey'
};

describe('User Actions', () => {
  it('should dispatch appropriate action type when a user is found', () => {
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: {
          users: [
            {
              id: 1,
              username: 'sasuke',
              email: 'sasuke@konoha.com',
              phoneNumber: '09012345678'
            }
          ]
        }
      })
    );
    const store = mockStore({});
    const expectedActions = [
      {
        type: types.SET_USERS,
        users: [
          {
            id: 1,
            username: 'sasuke',
            email: 'sasuke@konoha.com',
            phoneNumber: '09012345678'
          }
        ]
      }
    ];
    return store.dispatch(actions.getUsers(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should send a verification code for resetting password', () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: 'ACTION_SUCCESS',
        payload: {
          status: false,
          actionName: 'SEND_VERIFICATION_CODE'
        }
      },
      {
        type: 'ADD_FLASH_MESSAGE',
        message:
        {
          type: 'success',
          text: 'Verification code sent'
        }
      }
    ];
    axios.post = jest.fn(() =>
      Promise.resolve({
        data:
        {
          message: 'Verification code sent'
        }
      })
    );
    return store.dispatch(actions.sendVerificationCode(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should update user password and return success message',
  () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: 'ACTION_SUCCESS',
        payload: {
          status: false,
          actionName: 'VERIFY_PASSWORD_RESET_CODE'
        }
      },
      {
        type: 'ADD_FLASH_MESSAGE',
        message: {
          type: 'success',
          text: 'Code verification successful, Please login now'
        }
      }
    ];
    axios.post = jest.fn(() =>
      Promise.resolve(
        {
          data:
          {
            message: 'password updated successfully'
          }
        }
    ));
    return store.dispatch(actions.verifyCode(mockData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should verify code for resetting password is invalid', () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: 'ACTION_FAILED',
        payload: {
          status: true,
          actionName: 'VERIFY_PASSWORD_RESET_CODE'
        }
      },
      {
        type: 'ADD_FLASH_MESSAGE',
        message: {
          type: 'error',
          text: 'Code verification failed'
        }
      }
    ];
    axios.post = jest.fn(() =>
      Promise.resolve({
        data: {
          message: null
        }
      }
    ));
    return store.dispatch(actions.verifyCode({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should get members of a group', () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: 'SET_MEMBERS',
        members: [
          'naruto',
          'batman'
        ]
      }
    ];
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: {
          members: [
            'naruto',
            'batman'
          ]
        }
      }
    ));
    return store.dispatch(actions.getMembersOfGroup(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

