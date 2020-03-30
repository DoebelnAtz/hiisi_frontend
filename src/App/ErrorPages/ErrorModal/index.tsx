import ReactDOM from 'react-dom';
import React, { useContext, useEffect } from 'react';

import { ErrorContext } from '../../../Context/ErrorContext';
import { ErrorDiv } from './Styles';

const ErrorModal: React.FC = () => {
	const { state: error, update: setError } = useContext(ErrorContext);

	useEffect(() => {
		setTimeout(() => {
			setError('');
		}, 3000);
	}, [error]);

	return ReactDOM.createPortal(
		<ErrorDiv>
			<img
				src={'https://cdn.intra.42.fr/users/small_marvin.png'}
				alt={'error'}
			/>
			<span>{error}</span>
		</ErrorDiv>,

		document.querySelector('#error') as Element,
	);
};

export default ErrorModal;
