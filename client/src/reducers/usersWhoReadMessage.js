
import { SET_USERS_WHO_READ_MESSAGE } from '../actions/types';

/**
 * @description - It updates the store with a list of users who read a message
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} - current state
 */
export default (state = [], action) => {
  switch (action.type) {
    case SET_USERS_WHO_READ_MESSAGE:
      return action.users.map(user => ({ ...state,
        id: user.id,
        username: user.username,
        messageId: user.ReadMessages.messageId
      }));

    default: return state;

  }
};
