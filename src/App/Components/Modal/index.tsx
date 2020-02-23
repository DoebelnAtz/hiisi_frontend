import React, { RefObject, useRef } from 'react';
import ReactDOM from 'react-dom';
import { OutsideDiv, InsideDiv } from './Styles';

type ModalProps = {
	inside: RefObject<HTMLDivElement>;
};

const Modal: React.FC<ModalProps> = ({ children, inside }) => {
	return (
		<OutsideDiv>
			<InsideDiv ref={inside}>{children}</InsideDiv>
		</OutsideDiv>
	);
};

export default Modal;
