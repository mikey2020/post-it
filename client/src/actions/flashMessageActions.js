import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

const createMessage = (typeName, message) => {
  return {
    type: typeName,
    text: message
  };
};

const addFlashMessage = (message) => {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
};

const deleteFlashMessage = (id) => {
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  };
};

export { addFlashMessage, deleteFlashMessage, createMessage };
