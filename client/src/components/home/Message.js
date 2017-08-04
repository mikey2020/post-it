import React from 'react';

import PropTypes from 'prop-types';


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
              <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
            </li>
            </div>
          </ul>
        </div>

      </div>
    );
  }
}

Message.propTypes = {
  content: PropTypes.string.isRequired
};


export default Message;
