import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SigninForm from './signin/SigninForm.jsx';
import { signOut } from '../actions/signinActions';
import { deleteNotification } from '../actions/notificationAction';

/**
 *  Header class component
 * @class
 */
export class Header extends React.Component {
  /**
   * @constructor
   *
   * @param {object} props -  inherit props from react class
   */
  constructor(props) {
    super(props);

    this.state = {
      notices: 0,
      showNotices: 'false'
    };

    this.logout = this.logout.bind(this);
    this.clearNotifications = this.clearNotifications.bind(this);
  }
  /**
   * @returns {void}
   */
  componentDidMount() {
    $('.dropdown-button').dropdown();
  }

  /**
   * @param {Object} nextProps
   *
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.notifications !== nextProps.notifications) {
      this.setState({ showNotices: 'true' });
    }
  }
  /**
   * @description - It calls signOut function, that allows user's logout
   *
   * @param {object} event - argument
   *
   * @returns {void}
   */
  logout(event) {
    event.preventDefault();
    this.props.signOut();
    location.href = '/signup';
  }
  /**
   * @description - It clears a user notifications
   *
   * @param {Object} event
   *
   * @returns {void}
   */
  clearNotifications(event) {
    event.preventDefault();
    this.props.deleteNotification();
    this.setState({ showNotices: 'false' });
    this.state.showNotices = 'false';
  }

  /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    const { isAuthenticated } = this.props;
    const { showNotices } = this.state;
    const showUserLinks = isAuthenticated ? '' : 'hide';
    const showGuestLinks = isAuthenticated ? 'hide' : '';

    const userLinks = (
      <div className={showUserLinks}>
        <nav>
          <div className="nav-wrapper light-blue">
            <a href="#!" className="brand-logo hide-on-med-and-down">PostIT</a>
            <a
              href="#!"
              className="brand-logo hide-on-large-only show-on-small new-header"
            >PostIT</a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a href="#modal4" onClick={this.clearNotifications}>
                  <i className="material-icons modal-trigger">
                  notifications</i></a></li>
              { showNotices === 'true' &&
                <li><span className="notify">
                  { this.props.notifications.length } </span></li> }
              <li>
                <a
                  className="dropdown-button"
                  href="#!"
                  data-activates="dropdown1"
                  id="logout-button"
                >

                  {this.props.username}
                  <i className="material-icons right">
                  arrow_drop_down</i></a>
                <ul id="dropdown1" className="dropdown-content">
                  <li>
                    <a
                      href=""
                      onClick={this.logout}
                      className="logout-button"
                    >Logout</a></li>
                  <li className="divider" />
                </ul>
              </li>

            </ul>
            <ul className="right hide-on-large-only show-on-small">
              <li>
                <a href="#modal4" onClick={this.clearNotifications}>
                  <i className="material-icons modal-trigger">
                  notifications</i></a></li>
              { showNotices === 'true' &&
                <li><span className="notify">
                  { this.props.notifications.length } </span></li> }
              <li>
                <a
                  className="dropdown-button"
                  href="#!"
                  data-activates="mobile"
                  id="logout-button"
                >{this.props.username}
                  <i className="material-icons right">
                  arrow_drop_down</i></a>
                <ul id="mobile" className="dropdown-content">
                  <li>
                    <a
                      href=""
                      onClick={this.logout}
                      className=""
                    >Logout</a></li>
                  <li className="divider" />
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );


    const guestLinks = (
      <nav className={showGuestLinks}>
        <div className="nav-wrapper light-blue">
          <Link to="/" className="brand-logo">PostIT</Link>
          <ul className="right">
            <div>
              <li>
                <a
                  className=""
                  id="login-button"
                  href="#modal1"
                >Sign In</a></li>
              <li>
                <Link
                  className=""
                  to="/signup"
                >Sign Up</Link></li>
            </div>
          </ul>
        </div>
      </nav>

   );

    return (
      <div className="row">
        {guestLinks}
        {userLinks}
        <SigninForm />
      </div>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteNotification: PropTypes.func.isRequired
};

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  username: state.user.user.username,
  notifications: state.notifications
});

export default connect(mapStateToProps,
{ signOut, deleteNotification })(Header);
