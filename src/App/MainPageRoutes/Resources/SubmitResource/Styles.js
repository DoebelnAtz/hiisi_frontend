import styled from 'styled-components';
import {
	color,
	components,
	font,
	layout,
	length,
} from '../../../../Styles/SharedStyles';

export const OuterDiv = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 5;
`;

export const TitleLinkTypeCol = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	max-width: 200px;

`;

export const TitleError = styled.span`
	${font.text};
	margin-top: 2px;
	font-size: 14px !important;
	color: red;
`;

export const TitleInputDiv = styled.div`
	${layout.row};
	margin-top: ${length.margin};
	width: calc(100% - ${length.margin});
	& span {
		font-size: 20px;
		margin-bottom: ${length.margin};
		margin-right: ${length.margin};
	}
`;

export const TitleInput = styled.input`
	${components.input};
	border-color: ${(props) => (props.error ? 'red' : color.primary)};
	width: 100%;
`;

export const LinkInputDiv = styled.div`
	${layout.row};
	margin-top: ${length.margin};
	width: calc(100% - ${length.margin});
	& span {
		font-size: 20px;
		margin-bottom: ${length.margin};
		margin-right: ${length.margin};
	}
`;

export const LinkInput = styled.input`
	${components.input};
	border-color: ${(props) => (props.error ? 'red' : color.primary)};
	width: 100%;
`;

export const TypeDropDownSpan = styled.span`
	font-size: 20px;
	margin-top: ${length.margin};
`;

export const TypeDropDown = styled.div`
	margin-top: calc(${length.margin});
	margin-right: ${length.margin};
	${layout.row};
`;

export const EditDescriptionCol = styled.div`
	margin-top: ${length.margin};
	width: max(50%, calc(100% - 200px));
	display: flex;
	height: 40vh;
	flex-direction: column;
	& span {
		margin-bottom: ${length.margin};
		font-size: 20px;
		color: ${(props) => (props.error ? 'red' : color.primary)};
	}
`;

export const ButtonRow = styled.div`
	${layout.row};
	margin-top: 40px;
	& button {
		${components.button};
	}
`;

export const SubmitResource = styled.div`
	position: absolute;
	padding: ${length.margin};
	display: flex;
	flex-direction: column;
	${props => props.isMobile ? `
		left: 5%;
		right: 5%;
		top: 15%;
	` : `
	left: 20%;
	right: 20%;
	top: 25%;
	`};
	color: ${color.primary};
	border: 5px solid ${color.siteBG2};
	border-radius: 2px;
	margin: auto;
	background: ${color.siteBG2};
	overflow: auto;
	z-index: 2 !important;
`;
