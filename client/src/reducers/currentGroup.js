
import { ADD_CURRENT_GROUP } from '../actions/types';

const initialState = {
  id: '',
  name: '',
  creator: ''
};

/**
 * @description - It add current group to the store
 *
 * @param {Object} state
 * @param {Object} action
 *
 * @returns {Object} - current state
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_CURRENT_GROUP:
      return { ...state,
        id: action.group.id,
        name: action.group.name,
        creator: action.group.creator
      };

    default: return state;

  }
};
