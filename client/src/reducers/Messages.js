
import { ADD_GROUP_MESSAGES, ADD_MESSAGE } from '../actions/types';


export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_GROUP_MESSAGES:
      return action.messages.map((message) => {
        return Object.assign({}, {
          id: message.id,
          content: message.content,
          priority: message.priority,
          groupId: message.groupId
        });
      });


    case ADD_MESSAGE:
      return [
        ...state,
        {
          id: action.message.id,
          content: action.message.content,
          priority: action.message.priority,
          groupId: action.message.groupId
        }
      ];

    default: return state;

  }
};
