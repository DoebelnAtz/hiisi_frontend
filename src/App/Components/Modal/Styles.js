import styled from 'styled-components';

import { color, cursor, layout, length, modal } from '../../../Styles/SharedStyles';

export const OutsideDiv = styled.div`
	${modal.outside}
`;

export const InsideDiv = styled.div`
	${modal.inside};
	border-radius: 8px;
	padding: 0;
	${props => props.isMobile && `
		top: 5%;
		left: 5%;
		right: 5%;
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
	height: calc(100%);
	border-radius: ${length.radius};
	padding: ${length.margin};
`;
