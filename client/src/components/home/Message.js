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
             {/*<li className="collection-item"> */}
                <div className="message"> {this.props.content}</div>
                {this.props.creator ? <span className="chip user-display"> {this.props.creator}</span> : <br />}
                <span className="badge message-priority btn blue-grey darken-3">{this.props.priority ? this.props.priority : <p /> }</span>
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
