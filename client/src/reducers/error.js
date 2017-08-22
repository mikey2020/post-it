import { ACTION_FAILED, ACTION_SUCCESS } from '../actions/types';

const initialState = { errorStatus: false };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_FAILED:
      return {
        ...state,
        errorStatus: action.status
      };

    case ACTION_SUCCESS:
      return {
        ...state,
        errorStatus: action.status
      };

    default: return state;

  }
};
