import axios from 'axios';

import { SET_USERS } from './types';

import { addFlashMessage, createMessage } from './flashMessageActions';

const setUsers = (users) => {
    return {
        type: SET_USERS,
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

export { getUsers };
