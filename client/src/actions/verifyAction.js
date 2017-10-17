import { addFlashMessage, createMessage } from './flashMessageActions';
import { ACTION_FAILED, ACTION_SUCCESS } from './types';

/**
 * @description - It set errors in store if there is any
 *
 * @param {Object} payload
 *
 * @returns {Object} - an object containing anction type and payload
 */
const setErrors = (payload) => {
  if (payload.status === true) {
    return {
      type: ACTION_FAILED,
      payload
    };
  }
  return {
    type: ACTION_SUCCESS,
    payload
  };
};

/**
 * @description - It handle successful executions of actions
 *
 * @param {String} successMessage - message for success execution of an action
 * @param {String} actionName - name of action
 *
 * @returns {void}
 */
const handleSuccess = (successMessage, actionName) => (dispatch) => {
  dispatch(setErrors({ status: false, actionName }));
  if (successMessage !== null) {
    dispatch(addFlashMessage(createMessage('success', successMessage)));
  }
};

/**
 * @description - It handle unsuccessful executions of actions
 *
 * @param {String} errorMessage - message for failed execution of an action
 * @param {String} actionName - name of action
 *
 * @returns {void}
 */
const handleErrors = (errorMessage, actionName) => (dispatch) => {
  dispatch(setErrors({ status: true, actionName }));
  if (errorMessage !== null) {
    dispatch(addFlashMessage(createMessage('error', errorMessage)));
  }
};


export { handleErrors, handleSuccess };
