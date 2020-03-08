import styled from 'styled-components';
import {
	components,
	modal,
	length,
	layout,
	color,
} from '../../../../Styles/SharedStyles';

export const OutsideDiv = styled.div`
	${modal.outside};
	z-index: 5;
`;

export const InsideDiv = styled.div`
	padding: ${length.margin};
	${modal.inside};
	${props => props.isMobile ? `
		left: 5%;
		right: 5%;
		top: 20%;
	` : `
	left: 20%;
	right: 20%;
	top: 15%;
	bottom: 35%;
	`};
	z-index: 5;
`;

export const TitleAndLinkRow = styled.div`
	${layout.row};
	margin-bottom: ${length.margin};
	& label {
		line-height: 20px;
		width: 40%;
	}
	& label:nth-child(2) {
		margin-left: auto;
		margin-right: ${length.margin};
	}
`;

export const TitleInput = styled.input`
	${components.input};
	width: 100%;
`;

export const LinkInput = styled.input`
	${components.input};
	width: 100%;
`;

export const Description = styled.div`
	width: 100%;
	height: 25vh;
	margin: ${length.margin} 0;
`;

export const ButtonRow = styled.div`
	${layout.row};
`;

export const SubmitButton = styled.button`
	${components.button};
`;
