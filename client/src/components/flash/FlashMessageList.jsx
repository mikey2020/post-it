import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FlashMessage from './FlashMessage.jsx';
import { deleteFlashMessage } from '../../actions/flashMessageActions';

/**
 * @description - It renders a list of flash messages
 *
 * @returns {component} - It returns a react component
 *
 * @param {Object} props
 */
const FlashMessagesList = (props) => {
  const messages = props.messages.map(message =>
    (<FlashMessage
      key={message.id}
      message={message}
      deleteFlashMessage={props.deleteFlashMessage}
    />)

  );

  return (

    <div>
      {messages}
    </div>
  );
};

FlashMessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.func).isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.flashMessage
});

export default connect(mapStateToProps,
{ deleteFlashMessage })(FlashMessagesList);
