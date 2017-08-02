import React from 'react';

import { Link } from 'react-router';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import SigninForm from './signin/SigninForm';

import { signout } from '../actions/signinActions';

/**
 *  Header class component
 * @class
 */
export class Header extends React.Component {
  /**
   * @constructor
   * @param {object} props -  inherit props from react class
   */
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  /**
   * @param {object} e - argument
   * @returns {void}
   */
  logout(e) {
    e.preventDefault();
    this.props.signout();
    this.context.router.push('/');
  }

  /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const { isAuthenticated } = this.props.user;

    const userLinks = (
      <div>
        <li><Link to="/home" className="waves-effect waves-light">Home</Link></li>
        <li><a onClick={this.logout} className="waves-effect waves-light btn black">Logout</a></li>
      </div>
    );


    const guestLinks = (
      <div>
        <a className="waves-effect waves-light btn modal-trigger black" href="#modal1">Sign In</a>
        <li className="flow-text"><Link to="/signup">Sign Up</Link></li>
      </div>
   );

    return (
      <div className="row">
        <nav>
          <div className="nav-wrapper red darken-4">
            <Link to="/" className="flow-text">postIT</Link>
            <ul className="right">
              <div>
                {isAuthenticated ? userLinks : guestLinks}
              </div>
            </ul>
          </div>
        </nav>
        <SigninForm />
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  signout: PropTypes.func.isRequired
};

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { signout })(Header);
