import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

export default (ComposedComponent) => {
  /**
 *  SigninForm class component
 * @class
 */
  class Authenticate extends React.Component {
    /**
   *
   * @returns {void}
   */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.push('/signup');
      }
    }
    /**
   *
   * @returns {component} - renders a React component
   */
    render() {
      return <ComposedComponent {...this.props} />;
    }

   }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => {
    const response = { isAuthenticated: state.user.isAuthenticated };
    return response;
  };

  return connect(mapStateToProps)(Authenticate);
};
