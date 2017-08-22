import axios from 'axios';
import { SET_USERS, SET_MEMBERS } from './types';
// import { addFlashMessage, createMessage } from './flashMessageActions';
import handleErrors from './errorAction';

const setUsers = users => ({
  type: SET_USERS,
  users
});

const setMembers = members => ({
  type: SET_MEMBERS,
  members
});

const getUsers = username => dispatch => axios.post('/api/user', username)
            .then((res) => {
              if (res.data.users) {
                dispatch(setUsers(res.data.users.data));
              } else {
                dispatch(handleErrors(res.data.errors.message));
                // dispatch(addFlashMessage(createMessage('error', res.data.errors.message)));
              }
            });

const getMembersOfGroup = groupId => dispatch => axios.get(`/api/group/${groupId}/users`)
               .then((res) => {
                 if (res.data.members) {
                   console.log('am getting members', res.data.members);
                   dispatch(setMembers(res.data.members));
                 } else {
                   // dispatch(handleErrors(res.data.message));
                 }
               });
const checkUserExists = username => axios.post('/api/user/checkUser', username);

const resetPassword = userData => axios.post('/api/user/resetPassword', userData)
            .then((res) => {
              if (res.data.message) {
                console.log(res.data.message);
                // console.log('password has definitely changed');
              }
            });


export { getUsers, checkUserExists, resetPassword, getMembersOfGroup };
