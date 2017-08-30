import { ADD_USER_GROUPS, ADD_GROUP } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_USER_GROUPS:
      return action.groups.map(group => ({ ...state,
        id: group.id,
        name: group.groupName,
        creator: group.groupCreator
      }));


    case ADD_GROUP:
      return [
        ...state,
        {
          id: action.group.id,
          name: action.group.groupName,
          creator: action.group.groupCreator
        }
      ];
    default: return state;

  }
};
