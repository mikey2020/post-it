import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class
 */
export class FlashMessage extends React.Component {
  /**
   * @constructor
   * @returns {void}
   * @param {Object} props - Props object
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  /**
   * @param {Object} event
   * @returns {void}
   */
  onClick(event) {
    event.preventDefault();
    this.props.deleteFlashMessage(this.props.message.id);
  }
  /**
   * @returns {void}
   */
  render() {
    const { text } = this.props.message;

    return (

      <div className="chip flashMessage">
        {text}
        <i
          role="button"
          tabIndex={0}
          onClick={this.onClick}
          className="close material-icons"
        >close</i>
      </div>

    );
  }
}


FlashMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.func).isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};


export default FlashMessage;
