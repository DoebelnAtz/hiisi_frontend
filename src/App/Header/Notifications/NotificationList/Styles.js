import styled from 'styled-components';
import {
	color,
	cursor,
	font,
	layout,
	length,
} from '../../../../Styles/SharedStyles';

export const NotificationListDropDown = styled.div`
	width: 300px;
	z-index: 10;
	position: absolute;
	background-color: ${color.siteBG3};
	transform: translate(-40px, 10px);
	border-radius: ${length.radius};
	padding: ${length.margin} 0;
	&::before {
		content: '  ';
		position: absolute;
		left: 20%;
		top: -12px;
		margin-left: -6px;
		border-width: 6px;
		border-style: solid;
		border-color: transparent transparent ${color.siteBG3} transparent;
	}
`;

export const NotificationListDiv = styled.div`
	width: 300px;
	max-height: 20vh;
	overflow-y: auto;
	z-index: 11;
	border-radius: ${length.radius};
	background-color: ${color.siteBG3};
`;

export const NotificationItem = styled.div`
	${layout.row};
	${font.text};
	padding: 8px;
	z-index: 12;
	font-size: 14px;
	${cursor.clickable};
	background-color: ${color.siteBG2};
	margin: 0 5px ${length.margin} 5px;
	border-radius: ${length.radius};
`;
