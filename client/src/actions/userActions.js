import axios from 'axios';
import { SET_USERS, SET_MEMBERS } from './types';
import { handleErrors, handleSuccess } from './errorAction';
import { validateUser } from './signinActions';

const setUsers = users => ({
  type: SET_USERS,
  users
});

const setMembers = members => ({
  type: SET_MEMBERS,
  members
});

const getUsers = username => dispatch => axios.post('/api/v1/user', username)
            .then((res) => {
              if (res.data.users) {
                dispatch(setUsers(res.data.users.data));
              } else {
                dispatch(handleErrors(res.data.errors.message));
              }
            });

const getMembersOfGroup = groupId => dispatch => axios.get(`/api/v1/group/${groupId}/users`)
               .then((res) => {
                 if (res.data.members) {
                   dispatch(setMembers(res.data.members));
                 } else {
                   // dispatch(handleErrors(res.data.message));
                 }
               });
const checkUserExists = username => axios.post('/api/v1/user/checkUser', username);

const resetPassword = userData => axios.post('/api/v1/user/resetPassword', userData)
            .then((res) => {
              if (res.data.message) {
                console.log(res.data.message);
              }
            });

const verifyCode = (userData) => {
  return (dispatch) => {
    axios.post('/api/v1/user/verifyCode', userData)
    .then((res) => {
      console.log('status code', res.data.status);
      if (res.data.userToken) {
        dispatch(handleSuccess('Code verification successful, Please login now', 'VERIFY_PASSWORD_RESET_CODE'));
        dispatch(validateUser(res.data.userData));
      } else {
        dispatch(handleErrors('Code verification failure', 'VERIFY_PASSWORD_RESET_CODE_FAILURE'));
      }
    });
  };
};


export { getUsers, checkUserExists, resetPassword, getMembersOfGroup, verifyCode };
