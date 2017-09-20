import React from 'react';
import Header from './Header.jsx';
import FlashMessageList from './flash/FlashMessageList.jsx';
import CreateGroupForm from './home/CreateGroupForm.jsx';
import AddUserPage from './home/AddUserPage.jsx';
import Footer from './Footer.jsx';
import Notifications from './Notifications.jsx';
import Readers from './home/Readers.jsx';

/**
 *  Main App component
 *
 * @class
 *
 * @param {Object} props
 */
export default props =>
  /**
   *
   * @returns {component} - renders a React component
   */
   (
     <div>
       <Header />
       <FlashMessageList />
       <CreateGroupForm />
       <AddUserPage />
       <Notifications />
       <Readers />
       { props.children }
       <Footer />
     </div>
  );
