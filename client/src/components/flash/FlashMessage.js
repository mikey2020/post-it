import React from 'react';

import PropTypes from 'prop-types';

export class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { id, type, text } = this.props.message;

    return (

       <div className="chip flashMessage">
        {text}
        <i onClick={this.onClick} className="close material-icons">close</i>
      </div>
        
    );
  }
}


FlashMessage.propTypes = {

  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};


export default FlashMessage;
