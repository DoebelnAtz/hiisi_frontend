import styled, { css } from 'styled-components';
import {
	color,
	colorAdjust,
	components,
	cursor,
	font,
	length,
} from '../../../Styles/sharedStyles';

export const DropDown = styled.div`
	position: relative;
	margin: 0 ${length.margin};

	background-color: ${color.siteBG2};
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	&:hover {
		background-color: ${colorAdjust.darken(color.siteBG2, 0.1)};
	}
`;

export const CurrentOption = styled.div`
	padding: 0 ${length.margin};
	${font.text};
	border: 1px solid ${color.primary};
	border-radius: 4px 4px ${(props) => (props.expanded ? '0 0' : '4px 4px')};
	border-bottom: ${(props) => (props.expanded ? 'none' : '')};
	${cursor.clickable};
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	color: ${color.textColor};
	vertical-align: middle;
	text-align: center;
`;

export const DropDownList = styled.div`
	position: fixed;
	//right: -1px;
	width: ${(props) => props.width};
	background-color: ${color.siteBG2};
	z-index: 5;
	padding: 2px;
	max-height: 300px;
	overflow-y: auto;
	//top: calc(${(props) => `${props.height}`} - 1px);
	border-radius: 0 0 4px 4px;
	border: 1px solid ${color.primary};
	border-top: none;
`;

export const SearchInput = styled.input`
	${components.input};
	width: calc(100% - 4px);
	margin: 2px 2px;
`;

export const Option = styled.div`
	text-align: center;
	${font.text};
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	height: 28px;
	line-height: 28px;
	margin: 2px;
	padding: 0 6px;
	background-color: ${(props) =>
		props.highlighted
			? colorAdjust.darken(color.siteBG1, 0.15)
			: colorAdjust.darken(color.siteBG2, 0.2)};
	border-radius: 4px;
	transition: background-color 0.1s;
	${cursor.clickable};
	&:hover {
		background-color: ${color.siteBG1};
	}
`;
