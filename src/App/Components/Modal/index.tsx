import React, { RefObject } from 'react';
import ReactDOM from 'react-dom';
import {
	OutsideDiv,
	InsideDiv,
	ModalContent,
	ModalButtonsRow,
	CloseButton,
} from './Styles';
import SaveButton from '../Buttons/SaveButton';

type ModalProps = {
	inside: RefObject<HTMLDivElement>;
	saveCondition?: boolean;
	save?: () => Promise<boolean>;
	close: () => void;
};

const Modal: React.FC<ModalProps> = ({
	save = async () => true,
	saveCondition = false,
	children,
	inside,
	close,
}) => {
	return (
		<OutsideDiv>
			<InsideDiv ref={inside}>
				<ModalButtonsRow>
					{saveCondition && (
						<SaveButton onClick={save}>Save</SaveButton>
					)}
					<CloseButton onClick={close}>✕</CloseButton>
				</ModalButtonsRow>
				<ModalContent>{children}</ModalContent>
			</InsideDiv>
		</OutsideDiv>
	);
};

export default Modal;
