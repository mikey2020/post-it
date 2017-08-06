import React from 'react';

import { Route, IndexRoute } from 'react-router';

import App from './src/components/App';

import Welcome from './src/components/Welcome';

import SignupPage from './src/components/signup/SignupPage';

import SigninForm from './src/components/signin/SigninForm';

import HomePage from './src/components/home/HomePage';

import Authenticate from './src/components/Authenticate';

import ResetPassword from './src/components/ResetPassword';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Welcome} />
    <Route path="signup" component={SignupPage} />
    <Route path="signin" component={SigninForm} />
    <Route path="reset" component={ResetPassword} />
    <Route path="home" component={Authenticate(HomePage)} />
  </Route>
);
