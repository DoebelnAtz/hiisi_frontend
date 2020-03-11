import React from 'react';
import ReactDOM from 'react-dom';
import { ModalInside, ModalOutside } from './Style';

const ConfirmationModal: React.FC = () => {
	return ReactDOM.createPortal(
		<ModalOutside>
			<ModalInside>ConfirmationModal</ModalInside>
		</ModalOutside>,
		document.querySelector('#confirmation-modal') as Element,
	);
};

export default ConfirmationModal;
