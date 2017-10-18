import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import Validations from '../../../Validations';
import {
  postMessage,
  getGroupMessages,
  readMessage,
  addMessage,
  getUsersWhoReadMessage
} from '../../actions/messageActions';
import Message from './Message.jsx';
import MessageForm from './MessageForm.jsx';

const socket = io();
const validate = new Validations();
/**
 * Messages class component
 * @class
 */
export class Messages extends React.Component {
  /**
   * @constructor
   *
   * @param {object} props -  inherit props from react class
   */
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      errors: {},
      priority: 'normal',
      priorityLevel: 0,
      creator: '',
      limit: 50,
      offset: 0
    };

    socket.on('new message posted', (message) => {
      this.props.addMessage(message);
    });

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    this.viewArchived = this.viewArchived.bind(this);
  }
  /**
   * @returns {void}
   */
  componentDidMount() {
    const { group } = this.props;
    const { limit, offset } = this.state;
    this.props.getGroupMessages(group.id, limit, offset);
  }

  /**
   * @param {object} prevProps - previous props
   *
   * @returns {void}
   */
  componentDidUpdate(prevProps) {
    const { group } = this.props;
    const { limit, offset } = this.state;
    if (this.props.messages.length !== prevProps.messages.length) {
      this.props.getGroupMessages(group.id, limit + 10, offset);
    } else if (group.id !== prevProps.group.id) {
      this.props.getGroupMessages(group.id, limit, offset);
      this.props.messages.map(message => this.props.readMessage(message.id));
    }
  }

   /**
   * @param {object} event - argument
   *
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });

    if (this.isValid()) {
      this.setState(
        {
          errors: {},
          isLoading: false,
          creator: this.props.username
        }
      );
    }
  }
  /**
   * @description - It calls postMessage function
   *
   * @param {object} event - argument
   *
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState(
        {
          errors: {},
          isLoading: false,
          limit: this.state.limit + 1,
          offset: 0
        }
      );
      this.props.postMessage(this.state, this.props.group.id).then(() => {
        this.setState({ message: '' });
      });
    }
  }

  /**
   * @param {Object} event - Event object
   *
   * @returns {void}
   *
   * @description - It handles the priority level of a
   * message based on the user's input
   */
  handlePriority(event) {
    if (event.target.value > -1 && event.target.value < 3) {
      this.setState({ [event.target.name]: event.target.value,
        priority: 'normal' });
    } else if (event.target.value > 2 && event.target.value < 6) {
      this.setState({ [event.target.name]: event.target.value,
        priority: 'urgent' });
    } else if (event.target.value > 4 && event.target.value < 7) {
      this.setState({ [event.target.name]: event.target.value,
        priority: 'critical' });
    }
  }
  /**
   * @param {Object} event
   *
   * @returns {void}
   *
   * @description - It get a user's archived messages
   */
  viewArchived(event) {
    event.preventDefault();
    const { group } = this.props;
    const { limit, offset } = this.state;
    this.setState({ limit: limit + 5, offset: 0 });
    this.props.getGroupMessages(group.id, limit + 5, offset);
  }
  /**
   * @returns {void}
   *
   * @description - It checks if user's input is valid or not
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

    const { priority, errors, message, priorityLevel } = this.state;

    return (
      <div className="row">
        {errors.priority ?
          <span className="priority-error">{errors.priority}</span> : <br />
        }
        <div className="col s12 m12">
          <nav className="col s12 m12 l10 right-column-header">
            <div className="nav-wrapper">
              <div>
                <span id="group-name" className="left flow-text">
                  {this.props.group.name ?
                  this.props.group.name : 'No Group Selected' }
                </span>
                <a className="right" href="#modal3">
                  <i className="material-icons my-add-user right">
                  add_circle_outline</i>
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div>
          { this.props.messages.length > this.state.limit ?
            <div>
              <a
                href=""
                onClick={this.viewArchived}
                className="archived btn light-blue"
              >
          view archived</a> </div> : <p />
        }
          {this.props.messages.length > 0 ? <div
            className="all-messages col s8 m8 l9"
          >
            <ul>{allMessages}</ul>
          </div> : <p className="message-info col s8 m6 l9 push-s1">
          No message yet </p>}
          <div className="">
            <MessageForm
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              priority={priority}
              priorityLevel={priorityLevel}
              handlePriority={this.handlePriority}
              message={message}
              className="post-message"
            />
          </div>
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
  messages: state.messages,
  group: state.currentGroup,
  username: state.user.user.username,
  userId: state.user.user.id
});


export default connect(mapStateToProps,
  {
    postMessage,
    getGroupMessages,
    readMessage,
    addMessage,
    getUsersWhoReadMessage })(Messages);
