import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';


export class Message extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">

        <div className="col s12 m12 l12">
          <ul className="collection">
            <div className="message-box">
            <li className="collection-item avatar">
              <p className="message"> {this.props.content}</p>
              <a href="#!" className="collection-item"><span className="badge">{this.props.priority ? this.props.priority : <p /> }</span></a>
            </li>
            </div>
          </ul>
        </div>

      </div>
    );
  }
}

Message.propTypes = {
  content: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired
};


export default Message;
