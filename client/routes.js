import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './src/components/App.jsx';
import Welcome from './src/components/Welcome.jsx';
import SignupForm from './src/components/signup/SignupForm.jsx';
import SigninForm from './src/components/signin/SigninForm.jsx';
import HomePage from './src/components/home/HomePage.jsx';
import Authenticate from './src/components/Authenticate.jsx';
import ResetPassword from './src/components/ResetPassword.jsx';
import PageNotFound from './src/components/PageNotFound.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Authenticate(Welcome)} />
    <Route path="signup" component={Authenticate(SignupForm)} />
    <Route path="signin" component={SigninForm} />
    <Route path="home" component={Authenticate(HomePage)} />
    <Route path="reset" component={ResetPassword} />
    <Route path="*" component={PageNotFound} />
  </Route>
);
