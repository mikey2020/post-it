import React from 'react';

import ReactDOM from 'react-dom';

import routes from './routes';

import {Router,browserHistory} from 'react-router';

import {Provider} from 'react-redux';

import thunk from  'redux-thunk';

import {createStore} from 'redux';

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
