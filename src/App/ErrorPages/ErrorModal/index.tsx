import ReactDOM from 'react-dom';
import React, { useContext, useEffect } from 'react';

import { ErrorContext } from '../../../Context/ErrorContext';
import { ErrorDiv } from './Styles';

const ErrorModal: React.FC = () => {
	const { state: error, update: setError } = useContext(ErrorContext);

	useEffect(() => {
		setTimeout(() => {
			setError('');
		}, 2000);
	}, [error]);

	return ReactDOM.createPortal(
		<ErrorDiv>
			<span>{error}</span>
		</ErrorDiv>,

		document.querySelector('#error') as Element,
	);
};

export default ErrorModal;
