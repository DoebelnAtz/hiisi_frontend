import styled from 'styled-components'
import { color, cursor, font, length } from '../../../Styles/sharedStyles';

export const DropDown = styled.div`
	position: relative;
	background-color: ${color.siteBG3};
	border: 1px solid ${color.primary};
    border-radius: 4px 4px ${props => props.expanded ? '0 0' : '4px 4px'};
    border-bottom: ${props => props.expanded ? 'none' : ''};
`;

export const CurrentOption = styled.div`
	padding: 0 ${length.margin};
	${font.text};
	${cursor.clickable};
	color: ${color.primary};
	vertical-align: middle;
	text-align: center;
`;

export const DropDownList = styled.div`
	position: absolute;
	right: -1px;
	background-color: ${color.siteBG3};
	z-index: 2;
	padding: 2px;
	top: ${props => `${props.height - 1}px`};
	border-radius: 0 0 4px 4px;
	border: 1px solid ${color.primary};
	border-top: none;


`;

export const Option = styled.div`
	text-align: center;
	${font.text};
	height: 28px;
	line-height: 28px;
	margin: 2px;
	background-color: ${color.siteBG2};
	border-radius: 4px;
	transition: background-color 0.1s;
	${cursor.clickable};
	&:hover {
		background-color: ${color.siteBG1};
	}
`;
