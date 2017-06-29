import React from 'react';

import {Route,IndexRoute} from 'react-router';

import App from './components/App.jsx';

import Greetings from './components/Greetings.jsx';

import SignupPage from './components/signup/SignupPage.jsx';

import SigninPage from './components/signin/SigninPage.jsx';

import HomePage from './components/homepage/HomePage.jsx';

import PostMessage from './components/PostMessage.jsx';

import MessageBoard from './components/messageBoard/MessageBoard.jsx';

export default (
	<Route path ="/" component={App}>
		<IndexRoute component={Greetings}/>
		<Route path="signup" component={SignupPage}/>
		<Route path="signin" component={SigninPage}/>
		<Route path="home" component={HomePage}/>
		<Route path="postmessage" component={PostMessage}/>
		<Route path="messageboard" component={MessageBoard}/>
	</Route>
)