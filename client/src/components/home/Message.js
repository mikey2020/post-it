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
             {/*<li className="collection-item">*/}
                <p className="message"> {this.props.content}</p>
                {this.props.creator ? <span className="chip"> this.props.creator </span> : <br />}
                <a href="#!"><span className="badge">{this.props.priority ? this.props.priority : <p /> }</span></a>
              {/*</li>*/}
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
  creator: PropTypes.string.isRequired
};


export default Message;
