import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './src/components/App.jsx';
import Welcome from './src/components/Welcome.jsx';
import SignupPage from './src/components/signup/SignupPage.jsx';
import SigninForm from './src/components/signin/SigninForm.jsx';
import HomePage from './src/components/home/HomePage.jsx';
import Authenticate from './src/components/Authenticate.jsx';
import ResetPassword from './src/components/ResetPassword.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Welcome} />
    <Route path="signup" component={Authenticate(SignupPage)} />
    <Route path="signin" component={SigninForm} />
    <Route path="home" component={Authenticate(HomePage)} />
    <Route path="reset" component={ResetPassword} />
  </Route>
);
