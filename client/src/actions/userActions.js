import axios from 'axios';
import { SET_USERS, SET_MEMBERS } from './types';
import { handleErrors, handleSuccess } from './errorAction';

const setUsers = users => ({
  type: SET_USERS,
  users
});

const setMembers = members => ({
  type: SET_MEMBERS,
  members
});

const getUsers = username =>
  dispatch => axios.get(`/api/v1/users?username=${username}`, username)
    .then((res) => {
      if (res.data.users) {
        dispatch(setUsers(res.data.users));
      } else {
        dispatch(handleErrors(res.data.errors.message));
      }
    });

const getMembersOfGroup = groupId =>
  dispatch => axios.get(`/api/v1/group/${groupId}/users`)
    .then((res) => {
      if (res.data.members) {
        dispatch(setMembers(res.data.members));
      }
    });
const checkUserExists = username =>
  axios.post('/api/v1/user/checkUser', username);

const sendVerificationCode = userData =>
  dispatch => axios.post('/api/v1/user/setCode', userData)
    .then((res) => {
      if (res.data.message) {
        dispatch(handleSuccess(res.data.message,
          'VERIFICATION_CODE_SENT'));
      }
    });
const verifyCode = userData =>
  dispatch => axios.post('/api/v1/user/verifyCode', userData)
    .then((res) => {
      if (res.data.message) {
        dispatch(handleSuccess(`Code verification successful, 
        Please login now`, 'VERIFY_PASSWORD_RESET_CODE'));
      } else {
        dispatch(handleErrors('Code verification failed',
          'VERIFY_PASSWORD_RESET_CODE_FAILURE'));
      }
    });


export {
  getUsers,
  checkUserExists,
  sendVerificationCode,
  getMembersOfGroup, verifyCode
};
