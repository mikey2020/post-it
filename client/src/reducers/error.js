import { ACTION_FAILED, ACTION_SUCCESS } from '../actions/types';

const initialState = { errorStatus: false, actionName: '' };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_FAILED:
      return {
        ...state,
        errorStatus: action.payload.status,
        actionName: action.payload.actionName
      };

    case ACTION_SUCCESS:
      return {
        ...state,
        errorStatus: action.payload.status,
        actionName: action.payload.actionName
      };

    default: return state;

  }
};
