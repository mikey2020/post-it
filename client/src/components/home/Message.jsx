import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class
 */
export class Message extends React.Component {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }
  /**
   * @returns {void}
   */
  handleOnClick() {
    this.props.getUsersWhoReadMessage(this.props.messageId);
  }
  /**
   * @returns {void}
   */
  render() {
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <ul className="collection">
            <div className="message-box">
              <div
                className="message"
              > {this.props.content}
                <span className="message-time">{this.props.date}</span>
              </div>
              { this.props.creator ?
                <span className="chip user-display">
                  {this.props.creator}</span> : <br />}
              <span
                className="badge message-priority"
              >{this.props.priority ? this.props.priority : <p /> }</span>
              <a
                href="#modal5"
                className="messageReaders"
                onClick={this.handleOnClick}
              ><i className="material-icons">report</i></a>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  content: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readMessage: PropTypes.func.isRequired,
  messageId: PropTypes.number.isRequired,
  getUsersWhoReadMessage: PropTypes.func.isRequired
};


export default Message;
