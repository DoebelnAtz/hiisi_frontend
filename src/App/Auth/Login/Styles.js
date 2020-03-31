import styled from 'styled-components';
import {
	color,
	components,
	layout,
	length,
} from '../../../Styles/SharedStyles';
import { animated } from 'react-spring';

export const BackgroundDiv = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;

export const LoginDiv = styled(animated.div)`
	width: max(16vw, 128px);
	margin: auto;
	overflow: hidden;
	height: max(16vw, 128px);
	border-radius: max(8vw, 64px);
	background-color: ${color.primary};
	z-index: 3;
`;

export const InputDiv = styled.div`
	position: absolute;
	left: 50%;
	padding: ${length.margin} 0;

`;

export const UsernameDiv = styled.div`
	${layout.row};
`;

export const UsernameInput = styled(animated.input)`
	${components.input};
	${layout.centered};
	width: 0;
	height: 30px;
		z-index: 2;

`;

export const PasswordDiv = styled.div`
	margin: max(5px, 1vw) 0;
	${layout.row};
`;

export const PasswordInput = styled(animated.input)`
	${components.input};
	${layout.centered};
	width: 0;
	height: 30px;
	z-index: 2;
`;

export const LoginButton = styled(animated.div)`
	${layout.row};
	overflow: visible;
	flex-wrap: nowrap;
	& button {
		z-index: 2;
		margin: 0 auto;
		${components.button};
		height: inherit;
		padding: inherit;
		line-height: 20px;
		color: inherit;
		transition: border-color 400ms;
		border-color: ${props => props.loginError ? 'red' : color.primary};
	}
`;

export const OrangeDiv = styled(animated.div)`
	width: max(16vw, 128px);
	height: max(16vw, 128px);
	border-radius: max(8vw, 64px);

	background-color: ${color.secondary};
	z-index: 3;
`;

export const GreenDiv = styled(animated.div)`
	width: max(16vw, 128px);
	height: max(16vw, 128px);
	border-radius: max(8vw, 64px);
	background-color: ${color.tertiary};
	z-index: 3;
`;

export const HelperDiv = styled(animated.div)`
	position: absolute;
	z-index: 3;
`;
