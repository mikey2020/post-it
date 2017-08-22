import React from 'react';
import PropTypes from 'prop-types';

const Message = (props) =>  {
  return (
      <div className="row">

        <div className="col s12 m12 l12">
          <ul className="collection">
            <div className="message-box">
                <div className="message"> {props.content}  <span className="message-time">{props.date}</span></div>
                { props.creator ? <span className="chip user-display"> {props.creator}</span> : <br />}
                <span className="badge message-priority btn blue-grey darken-3">{props.priority ? props.priority : <p /> }</span>
            </div>
          </ul>
        </div>

      </div>
    );
}

Message.propTypes = {
  content: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};


export default Message;
