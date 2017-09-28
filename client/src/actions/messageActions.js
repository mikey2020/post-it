import axios from 'axios';
import {
  ADD_GROUP_MESSAGES,
  ADD_MESSAGE,
  SET_USERS_WHO_READ_MESSAGE,
  SET_UNREAD_MESSAGES
} from '../actions/types';
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

const setUnreadMessages = messages => ({
  type: SET_UNREAD_MESSAGES,
  messages
});

const getGroupMessages = (groupId, limit, offset) =>
  dispatch =>
    axios.get(
      `/api/v1/group/${groupId}/messages?limit=${limit}&offset=${offset}`)
      .then((res) => {
        if (res.data.messages) {
          dispatch(addGroupMessages(res.data.messages));
        }
      })
      .catch(() => {
        dispatch(addGroupMessages([]));
        dispatch(handleErrors(null, 'SET_USERS_WHO_READ_MESSAGE_FAILED'));
      });

const postMessage = (messageData, groupId) =>
  dispatch => axios.post(`/api/v1/group/${groupId}/message`, messageData)
    .then((res) => {
      if (res.data.postedMessage) {
        dispatch(addMessage(res.data.postedMessage));
      } else {
        dispatch(handleErrors(null, 'ADD_MESSAGE_FAILED'));
      }
    });

const readMessage = messageId =>
  dispatch => axios.post(`/api/v1/user/${messageId}/read`)
    .then((res) => {
      if (res.data.message) {
        dispatch(handleSuccess(null, 'USER_READ_MESSAGE'));
      }
    })
    .catch(() => {
      dispatch(handleErrors(null, 'USER_READ_MESSAGE_FAILED'));
    });

const getUnreadMessages = groupId => (dispatch) => {
  axios.get(`/api/v1/user/${groupId}/unreadMessages`)
    .then((res) => {
      dispatch(handleSuccess(null, 'SET_UNREAD_MESSAGES'));
      dispatch(setUnreadMessages(res.data.messages));
    })
    .catch(() => {
      dispatch(handleErrors(null, 'SET_UNREAD_MESSAGES_FAILED'));
    });
};

const getUsersWhoReadMessage = messageId =>
  dispatch => axios.get(`/api/v1/message/${messageId}/readers`)
    .then((res) => {
      if (res.data.users) {
        dispatch(setUsersWhoReadMessage(res.data.users));
      }
    })
    .catch(() => {
      dispatch(handleErrors(null,
        'SET_USERS_WHO_READ_MESSAGE_FAILED'));
    });

export {
  getGroupMessages,
  postMessage,
  addGroupMessages,
  addMessage,
  readMessage,
  getUnreadMessages,
  getUsersWhoReadMessage
};
