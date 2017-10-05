import axios from 'axios';
import { SET_USERS, SET_MEMBERS } from './types';
import { handleErrors, handleSuccess } from './errorAction';

/**
 * @description - It set list of users that match a user's search
 *
 * @param {Array} users
 *
 * @returns {Object} - It returns an action's type and
 * an array containing a list of users
 */
const setUsers = users => ({
  type: SET_USERS,
  users
});

/**
 * @description - It add members of a group to the store
 *
 * @param {Array} members
 *
 * @returns {Object} - It returns an action's type and
 * an array containing a members of a group
 */
const setMembers = members => ({
  type: SET_MEMBERS,
  members
});

/**
 * @desription - It gets a list of users from the database
 *
 * @param {String} username
 *
 * @returns {void}
 */
const getUsers = username =>
  dispatch => axios.get(`/api/v1/users?username=${username}`, username)
    .then((res) => {
      if (res.data.users) {
        dispatch(setUsers(res.data.users));
      } else {
        dispatch(handleErrors(res.data.errors.message));
      }
    })
    .catch((error) => {
      dispatch(handleErrors(error.data.message, 'ADD_USER_TO_GROUP'));
    });

/**
 * @description - It gets all members of a group
 *
 * @param {Number} groupId
 *
 * @returns {void}
 */
const getMembersOfGroup = groupId =>
  dispatch => axios.get(`/api/v1/group/${groupId}/users`)
    .then((res) => {
      if (res.data.members) {
        dispatch(setMembers(res.data.members));
      }
    })
    .catch(error => ({ error }));

/**
 * @description - It checks if a user exists in the database
 *
 * @param {String} username
 *
 * @returns {Object} - It returns api call response
 */
const checkUserExists = username =>
  axios.post('/api/v1/user/check-user', username)
  .then(res => res)
  .catch(error => error);

/**
 * @description - It sends a unique code to a user
 *
 * @param {Object} userData
 *
 * @returns {void}
 */
const sendVerificationCode = userData =>
  dispatch => axios.post('/api/v1/user/set-code', userData)
    .then((res) => {
      if (res.data.message) {
        dispatch(handleSuccess(res.data.message,
          'VERIFICATION_CODE_SENT'));
      }
    })
    .catch(error => ({ error }));

/**
 * @description - It verifies a user's unique code
 *
 * @param {Object} userData
 *
 * @returns {Object} - It returns api call response
 */
const verifyCode = userData =>
  dispatch => axios.post('/api/v1/user/verify-code', userData)
    .then((res) => {
      if (res.data.message) {
        dispatch(handleSuccess(`Code verification successful, 
        Please login now`, 'VERIFY_PASSWORD_RESET_CODE'));
      } else {
        dispatch(handleErrors('Code verification failed',
          'VERIFY_PASSWORD_RESET_CODE_FAILURE'));
      }
      return res;
    })
    .catch((error) => {
      dispatch(handleErrors('Code verification failed',
          'VERIFY_PASSWORD_RESET_CODE_FAILURE'));
      return error;
    });


export {
  getUsers,
  checkUserExists,
  sendVerificationCode,
  getMembersOfGroup, verifyCode
};
