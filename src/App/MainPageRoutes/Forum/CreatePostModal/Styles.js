import styled from 'styled-components';
import { animated } from 'react-spring';
import {
	color,
	components,
	font,
	layout,
	length,
	modal
} from '../../../../Styles/SharedStyles';

export const OutsideDiv = styled(animated.div)`
	${modal.outside};
`;

export const ModalDiv = styled(animated.div)`
	position: absolute;
	${modal.inside};
	color: ${color.primary};
	border: 5px solid ${color.siteBG2};
	border-radius: 4px;
	margin: auto;
	background: ${color.siteBG2};
	overflow: auto;
	z-index: 2 !important;
	display: flex;
	flex-direction: column;
`;

export const TitleText = styled.div`
	${font.text};
	font-size: 20px;
	${layout.row};
	color: ${(props) => (props.error ? 'red' : 'inherit')};
	margin: auto ${length.margin} 0 0;
`;

export const TitleError = styled.span`
	color: ${(props) => (props.error ? 'red' : 'inherit')};
	margin: auto auto 0 0;
`;

export const TitleInput = styled.input`
	${components.input};
	${font.text};
	margin: 0 auto;
	resize: vertical;
	border-radius: 5px;
	width: calc(100% - ${length.margin});
`;

export const ContentText = styled.div`
	margin: auto ${length.margin} 0 0;
	${font.text};
	font-size: 20px;
	color: ${(props) => (props.error ? 'red' : 'inherit')};
`;

export const ContentError = styled.span`
	color: ${(props) => (props.error ? 'red' : 'inherit')};
	margin: auto auto 0 0;
`;

export const ContentTextEditor = styled.div`
	margin: 0 auto;
	height: 30vh;
	margin-bottom: ${length.margin};
	width: calc(100%);
	${font.text};
	z-index: 5;
`;

export const LengthCounter = styled.div`
	${layout.row};
	color: ${(props) => (props.warning ? 'red' : color.primary)};
	& span {
		margin: auto auto 0 0;
	}
`;

export const ButtonRow = styled.div`
	${layout.row};
	width: calc(100%);
	margin: auto auto 0 auto;
`;

export const BackButton = styled.button`
	${components.button};
	margin-right: auto;
`;

export const SubmitButton = styled.button`
	${components.button};

`;
