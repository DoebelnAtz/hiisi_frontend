import styled from 'styled-components';

import {
	color,
	colorAdjust,
	components,
	cursor,
	layout,
	length,
} from '../../../Styles/sharedStyles';

export const RoomList = styled.div`
	position: absolute;
	background-color: ${colorAdjust.rgba(color.siteBG3, 0.95)};
	bottom: 20px;
	right: 0;
	height: auto;
	z-index: 42;
	border-top-left-radius: ${length.radius};
	border: 2px solid ${color.primary};
	border-right-width: 1px;
	width: 300px;
	padding: ${length.margin} ${length.margin} 20px ${length.margin};
`;

export const CreateThreadRow = styled.div`
	width: 90%;
	margin: 0 auto;
	${layout.row};
`;

export const ThreadItem = styled.div`
	width: 90%;
	${layout.row};
	margin: ${length.margin} auto;
	background-color: ${color.siteBG2};
	padding: 6px;
	border-radius: ${length.radius};
	${cursor.clickable};
	transition: background-color 0.1s;
	&:hover {
		background-color: ${color.siteBG1};
	}
	& span {
		color: ${color.primary};
	}
`;

export const NotificationIcon = styled.div`
	${components.notificationIcon};
`;
