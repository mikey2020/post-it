import React from 'react';
import PropTypes from 'prop-types';

const Readers = (props) => {
  /*const readers = props.readers.map(reader =>
    (<span
      key={reader.id}
      className="collection-item waves-effect waves-red btn add-user-btn teal lighten-2"
    >
      {reader}
      <button className="btn">read</button>
    </span>)
  );*/
  return (
    <div id="modal5" className="modal readers">
      <h3> List of users who read Message</h3>
      { /*props.readers ? <ul className="collection">{ props.readers.length > 0 && readers}</ul> : 'no-readers' */}
    </div>
  );
};

Readers.propTypes = {
  readers: PropTypes.arrayOf(PropTypes.string).isRequired
};


export default Readers;
