import React, { Dispatch, SetStateAction, useRef } from 'react';
import ReactDom from 'react-dom';
import { InsideDiv, OutsideDiv, TitleInput } from './Styles';
import { useDismiss } from '../../../Hooks';

type CreateProjectModalProps = {
	setShowModal: Dispatch<SetStateAction<boolean>>;
};

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
	setShowModal,
}) => {
	const inside = useRef<HTMLDivElement>(null);

	const close = () => {
		setShowModal(false);
	};

	useDismiss(inside, close);

	return (
		<OutsideDiv>
			<InsideDiv ref={inside}>
				<TitleInput placeholder={'title'} />
				CREATE PROJECT
			</InsideDiv>
		</OutsideDiv>
	);
};

export default CreateProjectModal;
