import { ACTION_FAILED } from '../actions/types';

const initialState = { errorStatus: false };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_FAILED:
      return Object.assign({}, state, {
        errorStatus: action.status
      });

    default: return state;

  }
};
