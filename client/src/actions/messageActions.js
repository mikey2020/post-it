import axios from 'axios';
import {
  ADD_GROUP_MESSAGES,
  ADD_MESSAGE,
  SET_USERS_WHO_READ_MESSAGE,
  SET_UNREAD_MESSAGES
} from '../actions/types';
import { handleErrors, handleSuccess } from './errorAction';

/**
 * @description - It adds a group's messages
 *
 * @param {Array} messages
 *
 * @returns {Object} - It returns an action's type and an array of messages
 */
const addGroupMessages = messages => ({
  type: ADD_GROUP_MESSAGES,
  messages
});

/**
 * @description - It adds a new message to the store
 *
 * @param {Object} message
 *
 * @returns {Object} - It returns an action's type and an array of messages
 */
const addMessage = message => ({
  type: ADD_MESSAGE,
  message
});

/**
 * @description - It adds users who read a message to the store
 *
 * @param {Array} users
 *
 * @returns {Object} - It returns an action's type and an array of messages
 */
const setUsersWhoReadMessage = users => ({
  type: SET_USERS_WHO_READ_MESSAGE,
  users
});

/**
 * @description - It adds unread messages to the store
 *
 * @param {Array} messages
 *
 * @returns {Object} - It returns an action's type and an array of messages
 */
const setUnreadMessages = messages => ({
  type: SET_UNREAD_MESSAGES,
  messages
});

/**
 * @description - It gets all messages posted in a group
 *
 * @param {Number} groupId
 * @param {Number} limit
 * @param {Number} offset
 *
 * @returns {void}
 */
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

/**
 * @description - It makes a call to add a new message to the database
 *
 * @param {Object} messageData
 * @param {Number} groupId
 *
 * @returns {void}
 */
const postMessage = (messageData, groupId) =>
  dispatch => axios.post(`/api/v1/group/${groupId}/message`, messageData)
    .then((res) => {
      if (res.data.postedMessage) {
        dispatch(addMessage(res.data.postedMessage));
      } else {
        dispatch(handleErrors(null, 'ADD_MESSAGE_FAILED'));
      }
    });

/**
 * @description - It makes an api call to add a read message to the database
 *
 * @param {Number} messageId
 *
 * @returns {void}
 */
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

/**
 * @description - It gets messages a user has not read
 *
 * @param {Number} groupId
 *
 * @returns {void}
 */
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

/**
 * @description - It gets users who read a message
 *
 * @param {Number} messageId
 *
 * @returns {void}
 */
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
