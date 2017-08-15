import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Validations from '../../../validations';
import { postMessage, getGroupMessages, readMessage } from '../../actions/messageActions';
import Message from './Message';
import subscribeToTimer from '../../../socket';

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
      emmitedData: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePriority = this.handlePriority.bind(this);

    subscribeToTimer((err, data) => this.setState({ emmitedData: data }));
  }
  /**
   * @returns {void}
   */
  componentDidMount() {
    if (this.props.group && this.props.userId) {
      const { group } = this.props;
      this.props.getGroupMessages(group.id);
    }
  }
  /**
   * @param {object} prevProps - previous props
   * @returns {void}
   */
  componentDidUpdate(prevProps) {
    if (this.props.messages.length !== prevProps.messages.length) {
      const { group } = this.props;
      this.props.getGroupMessages(group.id);
    } else if (this.props.group.id !== prevProps.group.id) {
      const { group } = this.props;
      this.props.getGroupMessages(group.id);
    }
  }
   /**
   * @param {object} e - argument
   * @returns {void}
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: false, creator: this.props.username });
    }
  }
  /**
   * @param {object} e - argument
   * @returns {void}
   */
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: false });
      this.props.postMessage(this.state, this.props.group.id);
    }
  }

  /**
   * @param {object} e - argument
   * @returns {void}
   */
  handlePriority(e) {
    e.preventDefault();
    if (e.target.value > 1 && e.target.value < 6) {
      this.setState({ priority: 'normal' });
    } else if (e.target.value > 5 && e.target.value < 11) {
      this.setState({ priority: 'urgent' });
    } else if (e.target.value > 10 && e.target.value < 16) {
      this.setState({ priority: 'critical' });
    }
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
      <Message key={message.id} content={message.content} priority={message.priority} creator={message.creator} />
        );

    return (
      <div className="row">
        {this.state.errors.priority ? <span className="priority-error">{this.state.errors.priority}</span> : <br />}
        <div>
          <nav className="col s12 m12 l12 right-column-header blue-grey darken-3">
            <div className="nav-wrapper">
              <div className="row">
                <a href="#!" className="col s7 m7 l7" id="group-name">{this.props.group.name ? this.props.group.name : 'No Group Selected' }</a>
                <a href="#modal3" className="col s3 m3 l3"><i className="material-icons adduser-icon">add_circle_outline</i></a>
              </div>
            </div>
          </nav>
        </div>

        <ul>{allMessages}</ul>

        <div className="row">
          <form className="col s12 m12 l12 form-group" onSubmit={this.onSubmit}>
            <label className="flow-text priority-label">Priority level:</label>
            <input className="priority-level" id="priority-level" type="range" name="points" min="0" max="15" onChange={this.handlePriority} />
            <textarea id="textarea1" name="message" onChange={this.onChange} className="materialize-textarea" rows="5" value={this.state.message} />
            <br />
            <div className="col s5 m4 l3">
              <button className="btn waves-effect waves-light teal lighten-2" type="submit" name="action">Post
										<i className="material-icons right">send</i>
              </button>
              <span className="thumb active" />
            </div>
            <button className="btn waves-effect waves-light priority">{this.state.priority} </button>
          </form>
        </div>

      </div>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  group: PropTypes.object.isRequired,
  postMessage: PropTypes.func.isRequired,
  getGroupMessages: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  messages: state.Messages,
  group: state.currentGroup,
  username: state.user.user.username
});


export default connect(mapStateToProps, { postMessage, getGroupMessages, readMessage })(Messages);
