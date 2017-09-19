import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class
 */
export class FlashMessage extends React.Component {
  /**
   * @constructor
   *
   * @returns {void}
   *
   * @param {Object} props - Props object
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  /**
   * @param {Object} event
   *
   * @returns {void}
   *
   * @description - A function that deletes a flash message
   */
  onClick(event) {
    event.preventDefault();
    this.props.deleteFlashMessage(this.props.message.id);
  }
  /**
   * @returns {void}
   */
  render() {
    const { text, type } = this.props.message;
    const toastContent = text;
    if (type === 'error') {
      Materialize.toast(toastContent, 10000, 'red');
    } else {
      Materialize.toast(toastContent, 3000, 'green');
    }
    return (
      <div />
    );
  }
}


FlashMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.func).isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};


export default FlashMessage;
