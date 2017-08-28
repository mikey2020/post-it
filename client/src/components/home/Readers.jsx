import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsersWhoReadMessage } from '../../actions/messageActions';

const Readers = (props) => {
  const readers = props.readers.map(reader =>
    (<p
      key={reader.id}
      className="collection-item"
    >
      {reader.username}
    </p>)
  );
  return (
    <div id="modal5" className="modal readers">
      <h3> List of users who read Message</h3>
      { props.readers ? <ul className="collection">{ props.readers.length > 0 && readers}</ul> : 'no-readers' }
    </div>
  );
};

Readers.propTypes = {
  readers: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  readers: state.usersWhoReadMessage
});

export default connect(mapStateToProps, { getUsersWhoReadMessage })(Readers);
