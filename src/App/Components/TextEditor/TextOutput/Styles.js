import styled, { css } from 'styled-components';
import {
	colorAdjust,
	color,
	length,
	layout,
	font,
} from '../../../../Styles/sharedStyles';

export const TextEditOutput = styled.textarea`
	width: calc(100%);
	height: calc(100%);
	padding: calc(${length.margin});
	border: none;
	color: ${color.primary};
	border-radius: ${length.radius};
	background-color: ${color.siteBG3};

	:focus {
		width: 100%;
		height: 100%;
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
