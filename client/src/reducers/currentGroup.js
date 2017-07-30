
import { ADD_CURRENT_GROUP } from '../actions/types';

const initialState = {
    id: '',
    name: '',
    creator: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_CURRENT_GROUP:
      return Object.assign({}, state, {
          id: action.group.id,
          name: action.group.name,
          creator: action.group.creator
      });

    default: return state;

  }
};
