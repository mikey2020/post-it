import React from 'react';

import {Route,IndexRoute} from 'react-router';

import App from './src/components/App.js';

import Welcome from './src/components/Welcome.js';

import SignupPage from './src/components/signup/SignupPage.js';

import SigninForm from './src/components/signin/SigninForm.js';

import HomePage from './src/components/home/HomePage.js';

export default (
	<Route path ="/" component={App}>
		<IndexRoute component={Welcome}/>
        <Route path="signup" component={SignupPage}/>
		<Route path="signin" component={SigninForm}/>
		<Route path="home" component={HomePage}/>
	</Route>
)