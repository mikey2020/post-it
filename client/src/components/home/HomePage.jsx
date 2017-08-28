import React from 'react';
import Sidebar from './Sidebar.jsx';
import Messages from './Messages.jsx';


/**
 *  HomePage class component
 * @class
 */
const HomePage = () =>
  /**
   *
   * @returns {component} - renders a React component
   */
   (
     <div className="row">
       <div className="col s4 m4 l3">
         <Sidebar />
       </div>
       <div className="col s8 m8 l9 message-board">
         <Messages />
       </div>
     </div>
  );


export default HomePage;
