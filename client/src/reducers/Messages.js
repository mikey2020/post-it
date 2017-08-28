
import { ADD_GROUP_MESSAGES, ADD_MESSAGE } from '../actions/types';


export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_GROUP_MESSAGES:
      return action.messages.map(message => ({ ...state,
        id: message.id,
        content: message.content,
        priority: message.priority,
        groupId: message.groupId,
        creator: message.messageCreator,
        timeCreated: message.createdAt
      }));


    case ADD_MESSAGE:
      return [
        ...state,
        {
          id: action.message.id,
          content: action.message.content,
          priority: action.message.priority,
          groupId: action.message.groupId,
          creator: action.message.messageCreator,
          timeCreated: action.message.createdAt
        }
      ];

    default: return state;

  }
};
