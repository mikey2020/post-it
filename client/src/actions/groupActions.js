import axios from 'axios';
import { ADD_USER_GROUPS, ADD_GROUP, ADD_CURRENT_GROUP } from './types';
import { addFlashMessage, createMessage } from './flashMessageActions';

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


const getUserGroups = () => dispatch => axios.post('/api/usergroups')
            .then((res) => {
              if (res.data.usergroups) {
                dispatch(addUserGroups(res.data.usergroups));
              }
            });

const createGroup = groupname => dispatch => axios.post('/api/group', groupname)
           .then((res) => {
             if (res.data.group.message) {
               dispatch(addGroup(res.data.group.data));
             } else {
               dispatch(addFlashMessage(createMessage('error', res.data.errors.message)));
             }
           });

const addUserToGroup = (user, groupId) => dispatch => axios.post(`/api/group/${groupId}/user`, user)
            .then((res) => {
              if (res.data.message) {
                console.log('added user successfully', res.data.message);
              } else {
                dispatch(addFlashMessage(createMessage('error', res.data.errors.message)));
              }
            });

export { createGroup, getUserGroups, setCurrentGroup, addUserToGroup };
