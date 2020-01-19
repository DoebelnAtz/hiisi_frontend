import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducers from './Reducers'

import App from './App/App'

// NOTE: Redux is not being used currently, would require a refactor to class based components to
// get any use of it, low priority but would make the code cleaner, especially good for removing
// currentNav states...
ReactDOM.render(
    <Provider store={createStore(reducers)}>
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    </Provider>,
    document.querySelector('#root'));