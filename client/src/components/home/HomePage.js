import React from 'react';
import Sidebar from './Sidebar';
import Messages from './Messages';


/**
 *  HomePage class component
 * @class
 */
export class HomePage extends React.Component {
  /**
   *
   * @returns {component} - renders a React component
   */
  render() {
    return (
      <div className="row">
        <div className="col s4 m4 l3">
          <Sidebar />
        </div>
        <div className="col s8 m8 l9 message-board">
          <Messages />
        </div>
      </div>
    );
  }
}


export default HomePage;
