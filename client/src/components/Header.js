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
    this.context.router.push('/signup');
  }

  /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const { isAuthenticated } = this.props.user;

    const userLinks = (
      <nav>
          <div className="nav-wrapper red darken-3">
            <Link to="/home" className="logo">PostIT</Link>
            <ul className="right">
               <div>
                <li><a className="flow-text waves-effect waves-light btn grey darken-3 links" ><Link to="/home">Home</Link></a></li>
                <li><a onClick={this.logout} className="flow-text waves-effect waves-light btn grey darken-3 links">Logout</a></li>
              </div>
            </ul>
          </div>
        </nav>
    );


    const guestLinks = (
       <nav>
          <div className="nav-wrapper red darken-3">
            <Link to="/signup" className="logo">PostIT</Link>
            <ul className="right">
              <div>
              <a className="flow-text waves-effect waves-light btn grey darken-3 modal-trigger links" href="#modal1">Sign In</a>
              <a className="flow-text waves-effect waves-light btn grey darken-3 links"><Link to="/signup">Sign Up</Link></a>
            </div>
            </ul>
          </div>
        </nav>
      
   );  

    return (
      <div className="row">   
        {isAuthenticated ? userLinks : guestLinks}
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
