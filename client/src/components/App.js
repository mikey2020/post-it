import React from 'react';

import Header from './Header.js';

export default class App extends React.Component {
  render() {
    return (
     <div className="">
       <Header/>
       {this.props.children}
      </div>
    );
  }
}