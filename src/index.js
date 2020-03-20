import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { WidthContextProvider } from './Context/WidthContext';
import App from './App/index';
import registerServiceWorker from "./registerServiceWorker";


ReactDOM.render(
	<WidthContextProvider>

	<BrowserRouter>
		<App />
	</BrowserRouter>
</WidthContextProvider>
,
	document.querySelector('#root'),
);
registerServiceWorker();