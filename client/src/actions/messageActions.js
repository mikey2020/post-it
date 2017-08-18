import axios from 'axios';
import { ADD_GROUP_MESSAGES, ADD_MESSAGE, SET_USERS_WHO_READ_MESSAGE } from '../actions/types';
import { addFlashMessage, createMessage } from './flashMessageActions';

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

const getGroupMessages = groupId => dispatch => axios.get(`/api/group/${groupId}/messages`)
            .then((res) => {
              if (res.data.posts) {
                dispatch(addGroupMessages(res.data.posts));
              }
            });

const postMessage = (messageData, groupId) => dispatch => axios.post(`/api/group/${groupId}/message`, messageData)
              .then((res) => {
                if (res.data.data) {
                  
                  dispatch(addMessage(res.data.data));
                } else {
                  dispatch(addFlashMessage(createMessage('error', res.data.message)));
                }
              });

/* const readMessage = messageId => axios.post(`/api/user/${messageId}/read`)
              .then((res) => {
                if (res.data.data) {
                  console.log(res.data);
                } else {
                  console.log('somethin=g went errrk');
                }
              });

const getUsersWhoReadMessage = (messageId) => {
  console.log('ther is a message id', messageId);
  return dispatch => axios.post(`/api/message/${messageId}/readers`)
              .then((res) => {
                if (res.data.users) {
                  console.log(res.data);
                  dispatch(setUsersWhoReadMessage(res.data.users));
                } else {
                  console.log('something went errrk');
                }
              });
}; */


export { getGroupMessages, postMessage, addGroupMessages, addMessage };
