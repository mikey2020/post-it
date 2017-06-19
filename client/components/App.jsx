import React from 'react';

import Header from './Header';

import FlashMessagesList from './flash/flashMessagesList.jsx'



export default class App extends React.Component {
  render() {
    return (
     <div className="container">
       <Header/>
       <FlashMessagesList/>
       {this.props.children}
      </div>
    );
  }
}