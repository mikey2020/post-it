import { SET_MEMBERS } from '../actions/types';

/**
 * @description - It updates the store with all members of a group
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} - current state
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_MEMBERS:
      return action.members.map(member => ({ ...state,
        username: member
      }));

    default: return state;

  }
};
