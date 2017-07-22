import React from 'react';

import Header from './Header.js';

import FlashMessageList from './flash/FlashMessageList';

export default class App extends React.Component {
  render() {
    return (
     <div>
       <Header/>
       <FlashMessageList/>
       {this.props.children}
      </div>
    );
  }
}