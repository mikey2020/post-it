import React from 'react';
import PropTypes from 'prop-types';
/**
 * @class
 */
class Message extends React.Component {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    // this.handlePageLoad = this.handlePageLoad.bind(this);
    // this.props.readMessage(this.props.messageId);
  }
  // /**
  //  * @returns {void}
  //  */
  // componentDidMount() {
  //   this.props.readMessage(this.props.messageId);
  // }
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
              > {this.props.content} <span className="message-time">{this.props.date}</span></div>
              { this.props.creator ?
                <span className="chip user-display"> {this.props.creator}</span> : <br />}
              <span
                className="badge message-priority btn blue-grey darken-3"
              >{this.props.priority ? this.props.priority : <p /> }</span>
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
  messageId: PropTypes.number.isRequired
};


export default Message;
