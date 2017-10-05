import axios from 'axios';

import { ADD_USER_GROUPS, ADD_GROUP, ADD_CURRENT_GROUP } from './types';
import { addFlashMessage, createMessage } from './flashMessageActions';
import { handleErrors, handleSuccess } from './errorAction';

/**
 * @description - It add user's groups to the store
 *
 * @param {Array} groups
 *
 * @returns {void}
 */
const addUserGroups = groups => ({
  type: ADD_USER_GROUPS,
  groups
});

/**
 * @description - It add a new group to the store
 *
 * @param {Object} group
 *
 * @returns {Object} - It returns an action's type and a group object
 */
const addGroup = group => ({
  type: ADD_GROUP,
  group
});

/**
 * @description - It adds the current group to the store
 *
 * @param {Object} group
 *
 * @returns {Object} - It returns an action's type and a group object
 */
const addCurrentGroup = group => ({
  type: ADD_CURRENT_GROUP,
  group
});

/**
 * @description - It dispatches addCurentGroup function
 *
 * @param {Object} group
 *
 * @returns {void}
 */
const setCurrentGroup = group => (dispatch) => {
  dispatch(addCurrentGroup(group));
};

/**
 * @description - It makes a call to /api/v1/user/groups api endpoint
 *
 * @returns {void}
 */
const getUserGroups = () => dispatch => axios.get('/api/v1/user/groups')
  .then((res) => {
    if (res.data.userGroups) {
      dispatch(addUserGroups(res.data.userGroups));
    }
  })
  .catch((error) => {
    dispatch(handleErrors(error.data.message, 'ADD_USER_GROUPS'));
  });

/**
 * @description - It makes a call to /api/v1/group api endpoint
 *
 * @param {String} groupName
 *
 * @returns {Object} - Its returns api call response
 */
const createGroup = groupName =>
  dispatch => axios.post('/api/v1/group', groupName)
    .then((res) => {
      if (res.data.group !== undefined && res.data.message) {
        dispatch(addGroup(res.data.group));
        dispatch(handleSuccess(res.data.message, 'ADD_GROUP'));
      } else if (res.data.errors.message) {
        dispatch(handleErrors(res.data.errors.message, 'ADD_GROUP'));
      }
      return res;
    })
    .catch((error) => {
      dispatch(handleErrors(error.data.error.message, 'ADD_GROUP'));
      return error;
    });

/**
 * @description - It makes an api call to add user to a group
 *
 * @param {String} user
 * @param {Number} groupId
 *
 * @returns {void}
 */
const addUserToGroup = (user, groupId) =>
  dispatch => axios.post(`/api/v1/group/${groupId}/user`, user)
    .then((res) => {
      if (res.data.message) {
        dispatch(addFlashMessage(createMessage('success',
          res.data.message)));
      } else {
        dispatch(handleErrors(res.data.errors.message));
      }
    })
    .catch((error) => {
      dispatch(handleErrors(error.data.errors.message));
    });

/**
 * @description - It makes an api call to check if a group already exists
 *
 * @param {String} value
 *
 * @returns {void}
 */
const groupExists = value => axios.get(`/api/v1/group/${value}`);

export {
  createGroup,
  getUserGroups, setCurrentGroup, addUserToGroup, groupExists
};
