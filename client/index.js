import React from 'react';
//Router history={browserHistory} routes={routes}
import ReactDOM from 'react-dom';

//import App from './components/App.jsx';

import {Router,browserHistory} from 'react-router';

//import { browserHistory } from 'react-router-dom'

import routes from './routes';


ReactDOM.render(
<Router history={browserHistory} routes={routes}/> ,
 document.getElementById('app')
 );

	