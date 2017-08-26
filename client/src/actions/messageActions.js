import axios from 'axios';
import { ADD_GROUP_MESSAGES, ADD_MESSAGE, SET_USERS_WHO_READ_MESSAGE, SET_UNREAD_MESSAGES } from '../actions/types';
import { addFlashMessage, createMessage } from './flashMessageActions';
import { handleErrors, handleSuccess } from './errorAction';

const addGroupMessages = messages => ({
  type: ADD_GROUP_MESSAGES,
  messages
});

const addMessage = message => ({
  type: ADD_MESSAGE,
  message
});

const setUsersWhoReadMessage = users => ({
  type: SET_USERS_WHO_READ_MESSAGE,
  users
});

const setUnreadMessages = (messages) => {
  return {
    type: SET_UNREAD_MESSAGES,
    messages
  };
};
const getGroupMessages = (groupId, limit, offset) => dispatch => axios.get(`/api/v1/group/${groupId}/messages?limit=${limit}&offset=${offset}`)
            .then((res) => {
              if (res.data.posts) {
                dispatch(addGroupMessages(res.data.posts));
              }
            });

const postMessage = (messageData, groupId) => dispatch => axios.post(`/api/v1/group/${groupId}/message`, messageData)
              .then((res) => {
                if (res.data.data) {
                  dispatch(addMessage(res.data.data));
                } else {
                  dispatch(addFlashMessage(createMessage('error', res.data.message)));
                }
              });

const readMessage = messageId => axios.post(`/api/v1/user/${messageId}/read`)
              .then((res) => {
                if (res.data.data) {
                  console.log(res.data);
                } else {
                  console.log('somethin=g went errrk');
                }
              });

const getUnreadMessages = (groupId) => {
  return (dispatch) => {
    axios.get(`/api/v1/user/${groupId}/unreadMessages`)
    .then(() => {
      // dispatch(setUnreadMessages(res.data.unreadMessages));
      dispatch(handleSuccess(null, 'SET_UNREAD_MESSAGES'));
    })
    .catch(() => {
      dispatch(handleErrors(null, 'SET_UNREAD_MESSAGES_FAILED'));
    });
  };
};
/* const getUsersWhoReadMessage = (messageId) => {
  console.log('ther is a message id', messageId);
  return dispatch => axios.post(`/api/v1/message/${messageId}/readers`)
              .then((res) => {
                if (res.data.users) {
                  console.log(res.data);
                  dispatch(setUsersWhoReadMessage(res.data.users));
                } else {
                  console.log('something went errrk');
                }
              });
}; */


export { getGroupMessages,
postMessage, addGroupMessages, addMessage, readMessage, getUnreadMessages };
