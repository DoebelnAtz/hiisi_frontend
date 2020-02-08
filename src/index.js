import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App/App';

// NOTE: Redux is not being used currently, would require a refactor to class based components to
// get any use of it, low priority but would make the code cleaner, especially good for removing
// currentNav states...

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.querySelector('#root'),
);
