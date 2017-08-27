import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Validations from '../../../validations';
import { postMessage, getGroupMessages, readMessage, addMessage, getUsersWhoReadMessage } from '../../actions/messageActions';
import Message from './Message';

const socket = io();
const validate = new Validations();
/**
 *  Messages class component
 * @class
 */
export class Messages extends React.Component {
  /**
   * @constructor
   * @param {object} props -  inherit props from react class
   */
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      errors: {},
      priority: '',
      creator: '',
      limit: 10,
      offset: 10
    };

    /*if (this.props.messages.length < 10) {
      this.state.offset = 0;
    } else {
      this.state.offset = Math.abs(this.props.messages.length - 10);
    }*/

    socket.on('new message posted', (message) => {
      this.props.addMessage(message);
    });

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    this.viewArchived = this.viewArchived.bind(this);
  }
  /**
   * @param {object} prevProps - previous props
   * @returns {void}
   */
  componentDidUpdate(prevProps) {
    const { group } = this.props;
    const { limit, offset } = this.state;
    if (this.props.messages.length !== prevProps.messages.length) {
      this.props.getGroupMessages(group.id, limit, offset);
    } else if (this.props.group.id !== prevProps.group.id) {
      this.props.getGroupMessages(group.id, limit, offset);
    }
  }
   /**
   * @param {object} event - argument
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: false, creator: this.props.username });
    }
  }
  /**
   * @param {object} event - argument
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: false, limit: this.state.limit + 1 });
      this.props.postMessage(this.state, this.props.group.id);
    }
  }

  /**
   * @param {Object} e - Event object
   * @returns {void}
   */
  handlePriority(e) {
    e.preventDefault();
    if (e.target.value > -1 && e.target.value < 6) {
      this.setState({ priority: 'normal' });
    } else if (e.target.value > 5 && e.target.value < 11) {
      this.setState({ priority: 'urgent' });
    } else if (e.target.value > 10 && e.target.value < 16) {
      this.setState({ priority: 'critical' });
    }
  }
  /**
   * @returns {void}
   */
  viewArchived(event) {
    event.preventDefault();
    const { group } = this.props;
    const { limit, offset } = this.state;
    this.setState({ limit: limit + 5, offset: 0 });
    this.props.getGroupMessages(group.id, limit + 5, offset);
    // this.setState({ limit: 10 });
  }
  /**
   * @param {object} e - argument
   * @returns {void}
   */
  isValid() {
    const { errors, isValid } = validate.input(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const allMessages = this.props.messages.map(message =>
      (<Message
        key={message.id}
        messageId={message.id}
        readMessage={this.props.readMessage}
        content={message.content}
        priority={message.priority}
        creator={message.creator}
        date={message.timeCreated}
        getUsersWhoReadMessage={this.props.getUsersWhoReadMessage}
      />)
    );

    return (
      <div className="row">
        {this.state.errors.priority ?
          <span className="priority-error">{this.state.errors.priority}</span> : <br />
        }
        <div>
          <nav className="col s12 m12 l12 right-column-header blue-grey darken-3">
            <div className="nav-wrapper">
              <div className="row">
                <a href="" className="col s5 m5 l5" id="group-name">{this.props.group.name ? this.props.group.name : 'No Group Selected' }</a>
                <a
                  href=""
                  className="col s2 m2 l2 dropdown-button btn members-dropdown"
                  data-beloworigin="true"
                  data-activates="dropdown1"
                > Members
                </a>
                <a href="#modal3" className="col s3 m3 l3">
                  <i className="material-icons adduser-icon">add_circle_outline</i>
                </a>
              </div>
            </div>
          </nav>
        </div>
        { this.props.messages.length > 0 &&
        <a href="" onClick={this.viewArchived} className="archived">..........View old messages.............</a>}
        <div className="all-messages"><ul>{allMessages}</ul></div>

        <div className="row">
          <form className="col s12 m12 l12 form-group post-message" onSubmit={this.onSubmit}>
            <label className="flow-text priority-label">Priority level:</label>
            <input
              className="priority-level"
              id="priority-level"
              type="range"
              name="points"
              min="0"
              max="15"
              onChange={this.handlePriority}
            />
            <button
              className="btn waves-effect waves-light priority"
            > heeloooo{this.state.priority} </button>
            <textarea
              id="textarea1"
              name="message"
              onChange={this.onChange}
              className="materialize-textarea"
              rows="5"
              value={this.state.message}
            />
            <br />
            <div className="col s5 m4 l3">
              <button
                className="btn waves-effect waves-light teal lighten-2"
                type="submit"
                name="action"
              >Post <i className="material-icons right">send</i>
              </button>
              <span className="thumb active" />
            </div>
          </form>
        </div>

      </div>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  group: PropTypes.objectOf(PropTypes.string).isRequired,
  postMessage: PropTypes.func.isRequired,
  getGroupMessages: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
  readMessage: PropTypes.func.isRequired,
  getUsersWhoReadMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.Messages,
  group: state.currentGroup,
  username: state.user.user.username
});


export default connect(mapStateToProps,
{ postMessage, getGroupMessages, readMessage, addMessage, getUsersWhoReadMessage })(Messages);
