import axios from 'axios';
import { ADD_USER_GROUPS, ADD_GROUP, ADD_CURRENT_GROUP } from './types';
import { addFlashMessage, createMessage } from './flashMessageActions';
import { handleErrors, handleSuccess } from './errorAction';

const addUserGroups = groups => ({
  type: ADD_USER_GROUPS,
  groups
});

const addGroup = group => ({
  type: ADD_GROUP,
  group
});

const addCurrentGroup = group => ({
  type: ADD_CURRENT_GROUP,
  group
});

const setCurrentGroup = group => (dispatch) => {
  dispatch(addCurrentGroup(group));
};


const getUserGroups = () => dispatch => axios.get('/api/v1/user/groups')
  .then((res) => {
    if (res.data.userGroups) {
      dispatch(addUserGroups(res.data.userGroups));
    }
  });

const createGroup = groupName =>
  dispatch => axios.post('/api/v1/group', groupName)
    .then((res) => {
      if (res.data.message) {
        dispatch(addGroup(res.data.group));
        dispatch(handleSuccess(res.data.message, 'ADD_GROUP'));
      } else {
        dispatch(handleErrors(res.data.errors.message, 'ADD_GROUP'));
      }
      return res;
    })
    .catch((error) => {
      dispatch(handleErrors(`Group already exists, 
             please try creating another one`, 'ADD_GROUP'));
      return error;
    });


const addUserToGroup = (user, groupId) =>
  dispatch => axios.post(`/api/v1/group/${groupId}/user`, user)
    .then((res) => {
      if (res.data.message) {
        dispatch(addFlashMessage(createMessage('success',
          res.data.message)));
      } else {
        dispatch(handleErrors(res.data.errors.message));
      }
    });

const groupExists = value => axios.get(`/api/v1/group/${value}`);

export {
  createGroup,
  getUserGroups, setCurrentGroup, addUserToGroup, groupExists
};
