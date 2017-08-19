import { addFlashMessage, createMessage } from './flashMessageActions';
import { ACTION_FAILED } from './types';

const setErrors = payload => ({
  type: ACTION_FAILED,
  payload
});

const handleErrors = (errorMessage, actionName) => {
  return (dispatch) => {
    dispatch(setErrors({ status: true, actionName }));
    dispatch(addFlashMessage(createMessage('error', errorMessage)));
  };
};


export default handleErrors;
