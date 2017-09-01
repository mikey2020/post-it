import { SET_UNREAD_MESSAGES } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_UNREAD_MESSAGES:
      return action.messages.map(message => ({ ...state,
        id: message.id,
        content: message.content,
        priority: message.priority,
        groupId: message.groupId,
        creator: message.messageCreator,
        timeCreated: message.createdAt
      }));

    default: return state;

  }
};
