import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SigninForm from './signin/SigninForm.jsx';
import { signout } from '../actions/signinActions';
import { getNotifications, deleteNotification } from '../actions/notificationAction';

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

    this.state = {
      notices: 0,
      showNotices: 'false'
    };

    // if (this.props.notifications.length > 0) {
    //   this.setState({ showNotices: 'true' });
    // } else {
    //   this.setState({ showNotices: 'true' });
    // }

    this.logout = this.logout.bind(this);
    this.clearNotifications = this.clearNotifications.bind(this);
  }
  // /**
  //  * @returns {void}
  //  */
  // componentWillMount() {
  //   this.props.getNotifications();
  // }

  /**
   * @param {Object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.notifications !== nextProps.notifications) {
      this.setState({ showNotices: 'true' });
    }
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
   * @param {Object} event
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
    const userLinks = (
      <nav>
        <div className="nav-wrapper">
          <Link to="/home" className="logo">PostIT</Link>
          <ul className="right">
            <div>
              <li>
                <a href="#modal4" onClick={this.clearNotifications}>
                  <i className="material-icons modal-trigger">notifications</i></a></li>
              { showNotices === 'true' &&
                <li><span className="notify"> { this.props.notifications.length } </span></li> }
              <li>
                <Link
                  className=""
                  to="/home"
                >
                Home</Link></li>
              <li>
                <a
                  href=""
                  onClick={this.logout}
                  className=""
                  id="logout-button"
                >Logout</a></li>
            </div>
          </ul>
        </div>
      </nav>
    );


    const guestLinks = (
      <nav>
        <div className="nav-wrapper">
          <Link to="/signup" className="logo">PostIT</Link>
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
        {isAuthenticated ? userLinks : guestLinks}
        <SigninForm />
      </div>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signout: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteNotification: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired
};

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  notifications: state.notifications
});

export default connect(mapStateToProps, { signout, deleteNotification, getNotifications })(Header);
