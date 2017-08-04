import React from 'react';

import ReactDOM from 'react-dom';

import routes from './routes';

import {Router,browserHistory} from 'react-router';

import {Provider} from 'react-redux';

import thunk from  'redux-thunk';

import {createStore,applyMiddleware,compose} from 'redux';

import rootReducer from './src/rootReducer';

import js from './html-actions.js';


const store = createStore(
	
	rootReducer,

	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
	
);



ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>

    ,document.getElementById('app')
    
    
);
