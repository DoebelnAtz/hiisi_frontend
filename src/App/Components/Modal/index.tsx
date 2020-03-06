import React, { RefObject, useRef } from 'react';
import ReactDOM from 'react-dom';
import { OutsideDiv, InsideDiv, ModalContent, ModalButtonsRow, CloseButton } from './Styles';

type ModalProps = {
	inside: RefObject<HTMLDivElement>;
	close: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, inside, close }) => {
	return (
		<OutsideDiv>
			<InsideDiv ref={inside}>
				<ModalButtonsRow><CloseButton onClick={close}>✕</CloseButton></ModalButtonsRow><ModalContent>{children}</ModalContent></InsideDiv>
		</OutsideDiv>
	);
};

export default Modal;
