import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description - It renders flash message
 *
 * @param {Object} props
 *
 * @returns {void}
 */
const FlashMessage = (props) => {
  const { id, text, type } = props.message;
  const toastContent = text;
  if (type === 'error') {
    Materialize.toast(toastContent, 10000, 'red');
    props.deleteFlashMessage(id);
  } else {
    Materialize.toast(toastContent, 3000, 'green');
    props.deleteFlashMessage(id);
  }
  return (
    <div />
  );
};


FlashMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.func).isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};


export default FlashMessage;
