import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Validations from '../../../validations';

import { postMessage, getGroupMessages } from '../../actions/messageActions';

import Message from './Message';

const validate = new Validations();

export class Messages extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      errors: {},
      priority: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
  }

  componentDidMount() {
    const { group } = this.props;
    this.props.getGroupMessages(group.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.messages.length !== prevProps.messages.length) {
      const { group } = this.props;
      this.props.getGroupMessages(group.id);
    } else if (this.props.group.id !== prevProps.group.id) {
      const { group } = this.props;
      this.props.getGroupMessages(group.id);
    }
  }

  isValid() {
    const { errors, isValid } = validate.input(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: false });
    }
  }

  handlePriority(e) {
    console.log('my state', this.state);
    e.preventDefault();
    if (e.target.value > 1 && e.target.value < 6) {
      this.setState({ priority: 'normal' });
    } else if (e.target.value > 5 && e.target.value < 11) {
      this.setState({ priority: 'urgent' });
    } else if (e.target.value > 10 && e.target.value < 16) {
      this.setState({ priority: 'critical' });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.errors);
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: false });
      this.props.postMessage(this.state, this.props.group.id);
    }
  }


  render() {
    const allMessages = this.props.messages.map(message =>
      <Message key={message.id} content={message.content} />
        );

    return (
      <div className="row">
        {this.state.errors.priority ? <span className="help-block">{this.state.errors.priority}</span> : <br />}
        <div>
          <nav className="col s12 m12 l12 right-column-header grey lighten-5">
            <div className="nav-wrapper">
              <div className="row">
                <a href="#!" className="col s7 m7 l7" id="group-name">{this.props.group.name ? this.props.group.name : this.props.username }</a>
                <a href="#modal3" className="col s3 m3 l3 waves-effect waves-light btn adduser-icon red darken-1">Add User</a>
              </div>
            </div>
          </nav>
        </div>

        <ul>{allMessages}</ul>

        <div className="row">
          <form className="col s12 m12 l12 form-group" onSubmit={this.onSubmit}>
            <label className="flow-text">Priority level:</label>
            <input className="priority-level black" id="priority-level" type="range" name="points" min="0" max="15" onChange={this.handlePriority}/>
            <textarea name="message" onChange={this.onChange} className="form-control" rows="5" id="comment" value={this.state.message} />
            <br />
            <div className="col s5 m4 l3">
              <button className="btn waves-effect waves-light red darken-1" type="submit" name="action">Post
										<i className="material-icons right">send</i>
              </button>
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
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  messages: state.Messages,
  group: state.currentGroup,
  username: state.user.user.username
});


export default connect(mapStateToProps, { postMessage, getGroupMessages })(Messages);
