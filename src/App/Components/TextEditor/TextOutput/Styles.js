import styled from 'styled-components';
import { color, length, font } from '../../../../Styles/SharedStyles';

export const TextEditOutput = styled.textarea`
	width: calc(100%);
	height: calc(100%);
	padding: ${length.margin};
	border: none;
	font-size: 16px;
	letter-spacing: 0;
	border-radius: ${length.radius};
	background-color: ${color.siteBG3};
	${font.text};
	resize: none;
	font-family: 'Roboto', sans-serif;

	:focus {
		width: 100%;
		outline: none;
	}
`;

export const TextOutput = styled.div`
	${font.text};
	width: calc(100%);
	height: calc(100%);
	padding: ${length.margin};
	border-radius: ${length.radius};
	background-color: ${color.siteBG3};
`;
