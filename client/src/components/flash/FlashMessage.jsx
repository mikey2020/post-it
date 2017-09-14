import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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

    return (

      <div className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}
      >
        <a
          role="button"
          tabIndex={0}
          onClick={this.onClick}
        >
          <i className="small close material-icons" >close</i></a>
        {text}
      </div>

    );
  }
}


FlashMessage.propTypes = {
  message: PropTypes.objectOf(PropTypes.func).isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};


export default FlashMessage;
