import React from 'react';
import Header from './Header';
import FlashMessageList from './flash/FlashMessageList';
import CreateGroupForm from './home/CreateGroupForm';
import AddUserPage from './home/AddUserPage';
import Members from './home/Members';
import Footer from './Footer';
import Notifications from './Notifications';
import Readers from './home/Readers';
/**
 *  Main App component
 * @class
 */
export default () =>
  /**
   *
   * @returns {component} - renders a React component
   */
   (
     <div>
       <Header />
       <FlashMessageList />
       <Notifications />
       <CreateGroupForm />
       <AddUserPage />
       <Readers />
       <Members />
       { this.props.children }
       <Footer />
     </div>
  );
