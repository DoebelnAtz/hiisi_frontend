import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { WidthContextProvider } from './Context/WidthContext';
import App from './App/index';



ReactDOM.render(
	<WidthContextProvider>

	<BrowserRouter>
		<App />
	</BrowserRouter>
</WidthContextProvider>
,
	document.querySelector('#root'),
);
