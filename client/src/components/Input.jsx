import React from 'react';
import PropTypes from 'prop-types';

const Input = props => (
  <div>
    <input
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      className={props.className}
    />
  </div>
  );

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Input;
