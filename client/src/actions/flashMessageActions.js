import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

const createMessage = (typeName, message) => ({
  type: typeName,
  text: message
});

const addFlashMessage = message => ({
  type: ADD_FLASH_MESSAGE,
  message
});

const deleteFlashMessage = id => ({
  type: DELETE_FLASH_MESSAGE,
  id
});

export { addFlashMessage, deleteFlashMessage, createMessage };
