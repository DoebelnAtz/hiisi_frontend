import styled from 'styled-components';
import { color, components, font, layout, length } from '../../../Styles/SharedStyles';

export const BackgroundDiv = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
`;

export const InputDiv = styled.div`
	margin: auto;
	width: max(20vw, 300px);
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

export const PasswordInput = styled.div`
	${layout.row};
	margin: ${length.margin} auto;
	width: 90%;
	& input {
		${components.input};
		width: 100%;
	}
	& span {
		${font.text};
		font-size: 14px;
		color: #992222;
		margin-left: ${length.margin};
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
