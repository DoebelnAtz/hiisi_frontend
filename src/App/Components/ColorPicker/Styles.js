import styled from 'styled-components';
import { color, length } from '../../../Styles/SharedStyles';

export const ColorPickerDiv = styled.div`
	display: flex;
	width: 210px;
	position: absolute;
	flex-wrap: wrap;
	padding: 5px 0 0 0;
	border-radius: ${length.radius};
	background-color: ${color.siteBG4};
	box-shadow: 1px 1px 4px #222222;
	&::before {
		content: '  ';
		position: absolute;
		top: -11px;
		left: 20%;
		margin-left: -6px;
		border-width: 6px;
		border-style: solid;
		border-color: transparent transparent ${color.siteBG4} transparent;
	}
`;

export const ColorDiv = styled.div`
	background-color: ${(props) => props.color};
	height: 30px;
	width: 30px;
	border-radius: ${length.radius};
	margin: 0 0 4px 4px;
`;
