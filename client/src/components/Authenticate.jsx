import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  /**
 *  Authenticate class component
 *
 * @class
 */
  class Authenticate extends React.Component {
    /**
   *
   * @returns {void}
   */
    componentWillMount() {
      if (!this.props.isAuthenticated || this.props.username) {
        this.context.router.push('/signup');
      } else {
        this.context.router.push('/home');
      }
    }

    /**
   * @param {object} prevProps - previous props
   *
   * @returns {void}
   */
    componentDidUpdate(prevProps) {
      if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
        if (!this.props.isAuthenticated || this.props.username) {
          this.context.router.push('/signup');
        } else {
          this.context.router.push('/home');
        }
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
    isAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => {
    const response = { isAuthenticated: state.user.isAuthenticated,
      username: state.user.username };
    return response;
  };

  return connect(mapStateToProps)(Authenticate);
};
