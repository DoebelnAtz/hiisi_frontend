import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { sessionService } from 'redux-react-session';

import App from './App/App'
import reducers from './reducers';

// Support for redux devtools, install the chrome extension to use


const validateSession = (session) => {
    // check if your session is still valid
    return true;
};

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnchancers(applyMiddleware(thunk)),
    );

const options = { refreshOnCheckAuth: true, redirectPath: '/home', driver: 'COOKIES', validateSession };


sessionService.initSessionService(store, options)
    .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
    .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root'));