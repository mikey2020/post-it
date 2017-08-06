import axios from 'axios';

import { SET_USERS, SET_MEMBERS } from './types';

import { addFlashMessage, createMessage } from './flashMessageActions';

const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }

}

const setMembers = (users) => {
    return {
        type: SET_MEMBERS,
        users
    }

}

const getUsers = (username) => {
    return (dispatch) => {
        return axios.post('/api/user', username)
            .then((res) => {
                if (res.data.users) {
                    dispatch(setUsers(res.data.users.data));
                    dispatch(addFlashMessage(createMessage('success','user gotten')));
                } else {
                    dispatch(addFlashMessage(createMessage('error', res.data.errors.message)));
                }
            });
    };
};

const getMembersOfGroup = (groupId) => {
    return (dispatch) => {
        return axios.get(`/api/group/${groupId}/users`)
               .then((res) => {
                if (res.data.data) {
                    console.log('am getting members', res.data.data);
                    dispatch(setMembers(res.data.data));
                    dispatch(addFlashMessage(createMessage('success', 'members gotten')));
                }
            });
    }
}

export { getUsers };
