import React, { RefObject } from 'react';
import {
	OutsideDiv,
	InsideDiv,
	ModalContent,
	ModalButtonsRow,
	CloseButton,
} from './Styles';
import SaveButton from '../Buttons/SaveButton';
import { useWidth } from '../../../Hooks';

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
	const [, isMobile] = useWidth();
	return (
		<OutsideDiv>
			<InsideDiv id={'modal-inside'} isMobile={isMobile} ref={inside}>
				<ModalButtonsRow>
					{saveCondition && (
						<SaveButton onClick={save}>Save</SaveButton>
					)}
					<CloseButton onClick={close}><span>✕</span></CloseButton>
				</ModalButtonsRow>
				<ModalContent
					id={'modal-content'}
					className={'scrollbar-animation'}
				>
					{children}
				</ModalContent>
			</InsideDiv>
		</OutsideDiv>
	);
};

export default Modal;
