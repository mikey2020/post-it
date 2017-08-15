import axios from 'axios';
import { SET_USERS, SET_MEMBERS } from './types';
import { addFlashMessage, createMessage } from './flashMessageActions';

const setUsers = users => ({
  type: SET_USERS,
  users
});

const setMembers = users => ({
  type: SET_MEMBERS,
  users
});

const getUsers = username => dispatch => axios.post('/api/user', username)
            .then((res) => {
              if (res.data.users) {
                dispatch(setUsers(res.data.users.data));
              } else {
                dispatch(addFlashMessage(createMessage('error', res.data.errors.message)));
              }
            });

/* const getMembersOfGroup = groupId => dispatch => axios.get(`/api/group/${groupId}/users`)
               .then((res) => {
                 if (res.data.data) {
                   console.log('am getting members', res.data.data);
                   dispatch(setMembers(res.data.data));
                   //  dispatch(addFlashMessage(createMessage('success', 'members gotten')));
                 }
               });
*/
const checkUserExists = username => axios.post('/api/user/checkUser', username);

const resetPassword = userData => axios.post('/api/user/resetPassword', userData)
            .then((res) => {
              if (res.data.message) {
                // console.log('password has definitely changed');
              }
            });


export { getUsers, checkUserExists, resetPassword };
