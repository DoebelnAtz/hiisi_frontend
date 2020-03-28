import styled from 'styled-components';
import { color, length, font } from '../../../Styles/SharedStyles';

export const TooltipDiv = styled.div`
	position: relative;
	visibility: hidden;
	opacity: 0;
	transition: opacity 0.2s;
	& div {
		position: absolute;
		z-index: 8;
		text-align: center;
		padding: 4px;
		border-radius: ${length.radius};
		background-color: ${color.siteBG4};
		transform: translate(calc(-100% - 48px), 0);
	}
	& div::after {
		content: '  ';
		position: absolute;
		top: 25%;
		left: calc(100% + 5px);
		margin-left: -6px;
		border-width: 6px;
		border-style: solid;
		border-color: transparent transparent transparent ${color.siteBG4};
	}
	& span {
		${font.text};
		font-size: 14px;
	}
`;