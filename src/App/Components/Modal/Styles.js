import styled from 'styled-components';

import { color, cursor, layout, length, modal } from '../../../Styles/SharedStyles';

export const OutsideDiv = styled.div`
	${modal.outside}
`;

export const InsideDiv = styled.div`
	${modal.inside};
	border-radius: 8px;
	padding: 0;
	overflow: unset;
	${props => props.isMobile && `
		top: 5%;
		left: 2%;
		right: 2%;
	`};
	border-color: ${color.siteBG3};
`;

export const ModalButtonsRow = styled.div`
	${layout.row};
	height: 40px;
	background-color: ${color.siteBG3};
`;

export const CloseButton = styled.span`
	${cursor.clickable};
	font-size: 28px;
	color: ${color.siteBG1};
	line-height: 40px;
	margin-left: auto;
	margin-right: ${length.margin};
	&:hover {
		transition: color 0.1s;
		color: ${color.siteBG}
	}

`;

export const ModalContent = styled.div`
	overflow-y: auto;
	max-height: 70vh;
	border: 2px solid ${color.siteBG2};
	border-radius: ${length.radius};
	padding: 5px;
	&:hover{
		border-right-width: 0;
		padding-right: 7px;
	}
`;
