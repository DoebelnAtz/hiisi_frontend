import styled from 'styled-components';
import {
	color,
	cursor,
	font,
	layout,
	length,
} from '../../../../Styles/SharedStyles';

export const NotificationListDiv = styled.div`
	width: 300px;
	position: absolute;
	max-height: 20vh;
	top: 65px;
	overflow-y: auto;
	z-index: 10;
	background-color: ${color.siteBG3};
`;

export const NotificationItem = styled.div`
	${layout.row};
	${font.text};
	padding: 8px;
	${cursor.clickable};
	background-color: ${color.siteBG2};
	margin: ${length.margin} 5px;
	border-radius: ${length.radius};
`;
