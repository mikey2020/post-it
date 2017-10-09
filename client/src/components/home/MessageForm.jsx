import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description - It renders a form for posting a message
 *
 * @param {Object} props
 *
 * @returns {component} - It returns a react component
 */
export const MessageForm = props => (
  <div className="row">
    <div className="col m12 push-m0.5">
      <form
        className={props.className}
        onSubmit={props.onSubmit}
      >
        <div className="col s11 m10 l12 pull-s1">
          <label
            htmlFor="priority level"
            className="flow-text priority-label left"
          >Priority level:</label>
          <input
            className="priority-level"
            id="priority-level"
            type="range"
            name="priorityLevel"
            min="0"
            max="6"
            step="3"
            value={props.priorityLevel}
            onChange={props.handlePriority}
          />
          <span
            className="btn flow-text waves-effect waves-light priority"
          > {props.priority} </span>
        </div>
        <div className="col s12 m12  push-m0.5">
          <input
            id=""
            type="text"
            name="message"
            onChange={props.onChange}
            className="input-field message-input"
            rows="5"
            value={props.message}
          />
        </div>
        <br />
        <div className="col s5 m6 l7 push-s1">
          <button
            className="btn waves-effect light-blue"
            type="submit"
            id="post-message-button"
            name="action"
          >Post <i className="material-icons right">send</i>
          </button>
          <span className="thumb active" />
        </div>
      </form>
    </div>
  </div>
);

MessageForm.propTypes = {
  message: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  priority: PropTypes.string.isRequired,
  priorityLevel: PropTypes.number.isRequired,
  handlePriority: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

export default MessageForm;
