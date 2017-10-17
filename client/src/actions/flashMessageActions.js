import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

/**
 * @description - It creates a new message object
 *
 * @param {String} typeName
 * @param {String} message
 *
 * @returns {Object} - It returns an message type and message
 */
const createMessage = (typeName, message) => ({
  type: typeName,
  text: message
});

/**
 * @description - It adds a new flash message to the store
 *
 * @param {String} message
 *
 * @returns {Object} - It returns an action's type and a message
 */
const addFlashMessage = message => ({
  type: ADD_FLASH_MESSAGE,
  message
});

/**
 * @description - It removes aflash message from the store
 *
 * @param {Number} id
 *
 * @returns {Object} - It returns an action's type and an id
 */
const deleteFlashMessage = id => ({
  type: DELETE_FLASH_MESSAGE,
  id
});

export { addFlashMessage, deleteFlashMessage, createMessage };
