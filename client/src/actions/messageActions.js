import axios from 'axios';

import { ADD_GROUP_MESSAGES, ADD_MESSAGE } from '../actions/types';

import { addFlashMessage, createMessage } from './flashMessageActions';


const addGroupMessages = (messages) => {
    return {
        type: ADD_GROUP_MESSAGES,
        messages
    }
   
}

const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
   
}


const getGroupMessages = (groupId) => {
   return (dispatch) => {
        return axios.get(`/api/group/${groupId}/messages`)
            .then((res) => {
                if (res.data.posts) {
                    dispatch(addGroupMessages(res.data.posts));
                    dispatch(addFlashMessage(createMessage('success', 'all messages loaded')));
                } else {
                    dispatch(addFlashMessage(createMessage('success', 'no message loaded')));
                }
            })
            .catch((error) => {
                dispatch(addFlashMessage(createMessage('error', 'something went messages')));
            });
    };
}

const postMessage = (messageData, groupId) => {
    return (dispatch) => {
        return axios.post(`/api/group/${groupId}/message`, messageData)
              .then((res) => {
                if (res.data.message.info) {
                    dispatch(addMessage(res.data.message.messageData));
                    dispatch(addFlashMessage(createMessage('success', res.data.message.info)));
                } else {
                    dispatch(addFlashMessage(createMessage('error', res.data.message)));
                }
              });
    };
};


export { getGroupMessages, postMessage };
