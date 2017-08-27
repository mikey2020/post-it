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
                 }
               });
const checkUserExists = username => axios.post('/api/v1/user/checkUser', username);

const resetPassword = userData => dispatch => axios.post('/api/v1/user/resetPassword', userData)
            .then((res) => {
              if (res.data.message) {
                dispatch(handleSuccess('Verification code sent successfully', 'VERIFICATION_CODE_SENT'));
              }
            });

const verifyCode = userData => (dispatch) => {
  axios.post('/api/v1/user/verifyCode', userData)
    .then((res) => {
      if (res.data.userToken) {
        dispatch(handleSuccess('Code verification successful, Please login now', 'VERIFY_PASSWORD_RESET_CODE'));
      } else {
        dispatch(handleErrors('Code verification failure', 'VERIFY_PASSWORD_RESET_CODE_FAILURE'));
      }
    });
};


export { getUsers, checkUserExists, resetPassword, getMembersOfGroup, verifyCode };
