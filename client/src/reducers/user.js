import isEmpty from 'lodash/isEmpty';

import { SET_USER, UNSET_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      });

    case UNSET_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: {}
      });

    default: return state;

  }
};
