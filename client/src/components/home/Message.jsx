import React from 'react';
import PropTypes from 'prop-types';

/**
 * @Class
 */
export class Message extends React.Component {
  /**
   * @constructor
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }
  /**
   * @description - It handles click event by calling,
   * getUsersWhoReadMessage function
   *
   * @returns {void}
   *
   * @description - handles onClick event when user views/reads a message
   */
  handleOnClick() {
    this.props.getUsersWhoReadMessage(this.props.messageId);
  }
  /**
   * @returns {void}
   *
   * @description - renders a react component
   */
  render() {
    return (
      <div className="row">
        <div className="col s12 m10 l12 push-m2 ">
          <ul className="collection">
            <div className="message-box">
              <div
                className="collection-item truncate"
              > {this.props.content}
              </div>
              { this.props.creator ?
                <span className="chip">
                  {this.props.creator}</span> : <br />}
              <span
                className="badge"
              >{this.props.priority ? this.props.priority : <p /> }</span>
              <a
                href="#modal5"
                className=""
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
  messageId: PropTypes.number.isRequired,
  getUsersWhoReadMessage: PropTypes.func.isRequired
};


export default Message;
