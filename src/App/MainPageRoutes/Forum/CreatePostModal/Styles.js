import styled from 'styled-components';
import { animated } from 'react-spring';
import {
	color,
	components,
	font,
	layout,
	length,
} from '../../../../Styles/SharedStyles';

export const OutsideDiv = styled(animated.div)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1;
`;

export const ModalDiv = styled(animated.div)`
	position: absolute;
	left: 25%;
	right: 25%;
	top: 15%;
	bottom: 45%;
	color: ${color.primary};
	border: 5px solid ${color.siteBG2};
	border-radius: 2px;
	margin: auto;
	background: ${color.siteBG2};
	overflow: auto;
	z-index: 2 !important;
	display: flex;
	flex-direction: column;
`;

export const TitleText = styled.div`
	${font.text};
	${layout.row};
	color: ${(props) => (props.error ? 'red' : 'inherit')};
	margin: ${length.margin} auto;
`;

export const TitleInput = styled.textarea`
	${components.textarea};
	${font.text};
	background-color: ${color.siteBG3};
	margin: 0 auto;
	resize: vertical;
	border-radius: 5px;
	border-color: ${color.siteBG3};
	height: 15%;
	width: 90%;
`;

export const ContentText = styled.div`
	margin: ${length.margin} auto;
	${font.text};
	color: ${(props) => (props.error ? 'red' : 'inherit')};
`;

export const ContentTextEditor = styled.div`
	margin: 0 auto;
	height: 50%;
	width: calc(90% + 10px);
	${font.text};
	z-index: 5;
`;

export const LengthCounter = styled.div`
	${layout.row};
	color: ${(props) => (props.warning ? 'red' : color.primary)};
	& span {
		margin: 0 auto;
	}
`;

export const ButtonRow = styled.div`
	${layout.row};
	width: 90%;
	margin: ${length.margin} auto;
	& button {
		width: 50%;
		background-color: ${color.siteBG3};
	}
`;

export const BackButton = styled.button`
	${components.button};
	border-radius: 4px 0 0 4px;
`;

export const SubmitButton = styled.button`
	${components.button};
	border-left: none;
	border-radius: 0 4px 4px 0;
`;
