
import { SET_USERS } from '../actions/types';

/**
 * @description - It updates the store with a list of users
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} - current state
 */
export default (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users.map(user => ({ ...state,
        id: user.id,
        username: user.username
      }));

    default: return state;

  }
};
