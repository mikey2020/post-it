import React from 'react';

import Header from './Header';

import FlashMessageList from './flash/FlashMessageList';

import CreateGroupForm from './home/CreateGroupForm';

import AddUserPage from './home/AddUserPage';

import Footer from './Footer';

import TestSideBar from './TestSideBar';

/**
 *  Main App component
 * @class
 */
export default class App extends React.Component {
  /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    return (
      <div>
        <Header />
        <FlashMessageList />
        <CreateGroupForm />
        <AddUserPage />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}
