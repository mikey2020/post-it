import React from 'react';

import ReactDOM from 'react-dom';

import {Router,browserHistory} from 'react-router';

import routes from './routes';

import {Provider} from 'react-redux';

import thunk from 'redux-thunk';

import {createStore,applyMiddleware} from 'redux';

const store = createStore(
	(state = {}) => state,
	applyMiddleware(thunk)
)
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes}/>
	</Provider>,

	document.getElementById('app')
);

	