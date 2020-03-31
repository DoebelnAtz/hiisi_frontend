import styled from 'styled-components';
import { color, components, font, layout, length } from '../../../Styles/SharedStyles';

export const BackgroundDiv = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
`;

export const InputDiv = styled.div`
	margin: auto;
	display: flex;
	flex-direction: column;
	border-radius: ${length.radius};
	background-color: ${color.primary};
`;

export const TitleDiv = styled.div`
	${layout.row};
	margin: ${length.margin} auto;
	${font.title};
	font-size: 46px;
	font-weight: 500;
`;

export const UsernameInput = styled.div`
	${layout.row};
	margin: ${length.margin} auto;
	width: 90%;
	& input {
		${components.input};
		width: 100%;
	}
	& span {
		${font.text};
		color: red;
		margin-left: ${length.margin};
		line-height: 36px;
	}
`;

export const Password1Input = styled.div`
	${layout.row};
	margin: ${length.margin} auto;
	width: 90%;
	& input {
		${components.input};
		width: 100%;
	}
	& span {
		${font.text};
		color: red;
		margin-left: ${length.margin};
		line-height: 36px;
	}
`;

export const Password2Input = styled.div`
	${layout.row};
	margin: ${length.margin} auto;
	width: 90%;
	& input {
		${components.input};
		width: 100%;
	& span {
		${font.text};
		color: red;
		margin-left: ${length.margin};
		line-height: 36px;
	}
`;

export const BackToLoginButton = styled.button`
	${components.button};
	width: calc(50% - ${length.margin} * 2);
	margin: ${length.margin} 5px ${length.margin} auto;
`;

export const SignupButton = styled.button`
	${components.button};
	width: calc(50% - ${length.margin} * 2);
	margin: ${length.margin} auto ${length.margin} 5px;
`;
