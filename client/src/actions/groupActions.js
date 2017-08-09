import axios from 'axios';

import { ADD_USER_GROUPS, ADD_GROUP, ADD_CURRENT_GROUP } from './types';

import { addFlashMessage, createMessage } from './flashMessageActions';

const addUserGroups = (groups) => {
  return {
    type: ADD_USER_GROUPS,
    groups
  };
};

const addGroup = (group) => {
    return {
        type: ADD_GROUP,
        group
    };
};

const addCurrentGroup = (group) => {
    return {
        type: ADD_CURRENT_GROUP,
        group
    };
};

const setCurrentGroup = (group) => {
    return (dispatch) => {
       dispatch(addCurrentGroup(group));
    }
};

const joinUserToGroup = (user) => {
     return {
        type: ADD_USER_TO_GROUP,
        user
    };
}


const getUserGroups = () => {
    return (dispatch) => {
        return axios.post('/api/usergroups')
            .then((res) => {
                if (res.data.usergroups) {
                    dispatch(addUserGroups(res.data.usergroups));
                    // dispatch(addFlashMessage(createMessage('success', 'all groups gotten')));
                } else {
                    dispatch(addFlashMessage(createMessage('success', 'somwething happened')));
                }
            })
            .catch(() => {
                dispatch(addFlashMessage(createMessage('success', 'something went wrong')));
            });
    };
};

const createGroup = (groupname) => {
  return (dispatch) => {
    return axios.post('/api/group', groupname)
           .then((res) => {
               if (res.data.group.message) {
                  console.log(res.data.group);
                  dispatch(addGroup(res.data.group.data));
                  // dispatch(addFlashMessage(createMessage('success', res.data.group.message)));
               } else {
                   dispatch(addFlashMessage(createMessage('error', res.data.errors.message)));
               }
           });
  };
};

const addUserToGroup = (user,groupId) => {
    return (dispatch) => {
        return axios.post(`/api/group/${groupId}/user`, user)
            .then((res) => {
                if (res.data.message) {
                    console.log(res.data.message);
                } else {
                    dispatch(addFlashMessage(createMessage('error', res.data.errors.message)));
                }
            });
    };
}

export { createGroup, getUserGroups, setCurrentGroup, addUserToGroup };
