import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Validations from '../../../validations';
import { createGroup, groupExists } from '../../actions/groupActions';

const validate = new Validations();
/**
 * Create group form component
 * @class
 */
export class CreateGroupForm extends React.Component {
  /**
   * @constructor
   * @param {object} props -  inherit props from react class
   */
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      errors: {},
      isLoading: false,
      invalid: false,
      group: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkGroupExists = this.checkGroupExists.bind(this);
  }

  /**
   * @returns {void}
   * @param {Object} event
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: false });
    }
  }
  /**
   * @returns {void}
   * @param {Object} event
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: false });
      this.props.createGroup(this.state);
        // this.setState({ name: '' });
    }
  }
   /**
    * @param {Object} event
    * @returns {void}
    */
  checkGroupExists(event) {
    const field = event.target.name;
    const value = event.target.value;
    if (value !== '') {
      this.props.groupExists(value).then((res) => {
        const errors = this.state.errors;
        let invalid;
        if (res.data.group) {
          errors[field] = 'Group already exists';
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  /**
   * @returns {void}
   */
  isValid() {
    const { errors, isValid } = validate.groupInput(this.state);
    if (!isValid) {
      this.setState({ errors, isLoading: true });
    }
    return isValid;
  }

   /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const { errors, name, isLoading, invalid } = this.state;
    return (
      <div id="modal2" className="modal group-form">
        <div className="" >
          {errors.message && <div className="alert alert-danger"> {errors.message} </div>}

          <form className="form-group" onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Enter group name"
              name="name"
              onChange={this.onChange}
              onBlur={this.checkGroupExists}
              className="form-control"
              value={name}
              id="usr"
            />

            <input
              type="submit"
              className="btn btn-primary active"
              value="Create Group"
              id="create-group-button"
              disabled={isLoading || invalid}
            />

            {errors.name ? <span className="help-block">{errors.name}</span> : <br />}
          </form>
        </div>
      </div>
    );
  }
}

CreateGroupForm.propTypes = {
  createGroup: PropTypes.func.isRequired,
  groupExists: PropTypes.func.isRequired
};


export default connect(null, { createGroup, groupExists })(CreateGroupForm);
