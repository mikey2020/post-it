/* eslint-disable import/no-extraneous-dependencies */
import isEmpty from 'lodash/isEmpty';
import { SET_USER, UNSET_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

/*
 * @description - It updates the store with a logged in user's data
 *
 * @param {Object} state
 * @param {Object} action
 *
 * @returns {Object} - current state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return { ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };

    case UNSET_USER:
      return { ...state,
        isAuthenticated: false,
        user: {}
      };

    default: return state;

  }
};
