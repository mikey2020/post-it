import React from 'react';

import Header from './Header.js';

import FlashMessageList from './flash/FlashMessageList';

import CreateGroupForm from './home/CreateGroupForm';

import AddUserPage from './home/AddUserPage';


export default class App extends React.Component {
  render() {
    return (
     <div>
       <Header/>
       <FlashMessageList/>
       <CreateGroupForm/>
       <AddUserPage/>
       {this.props.children}
      </div>
    );
  }
}