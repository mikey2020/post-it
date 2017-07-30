import React from 'react';

import Sidebar from './Sidebar';

import Messages from './Messages';

// import CreateGroupForm from './CreateGroupForm';


// import {connect} from 'react-redux';

class HomePage extends React.Component {
  render(){
      return (
         <div className="row">
             <div className="col s4 m4 l3">
               <Sidebar/>
             </div>
             <div className="col s8 m8 l9">
               <Messages/>
            </div>
         </div>
      )
  }
}


export default HomePage;