import styled from 'styled-components';

import {
	color,
	colorAdjust,
	components,
	cursor, font,
	layout,
	length,
} from '../../../Styles/SharedStyles';

export const CreateRoomRow = styled.div`
	width: calc(100% - ${length.margin} * 2);
	margin: ${length.margin};

	${layout.row};
`;

export const NotificationIcon = styled.div`
	${components.notificationIcon};
`;

export const DeleteButton = styled.div`
	margin-left: auto;
	${cursor.clickable};
	& img {
		height: 24px;
		width: 24px;
	}
`;

export const AddRoomInput = styled.input`
	${components.input};
	height: 32px;
	width: calc(100% - 72px - ${length.margin});
	border-radius: ${length.radius} 0 0 ${length.radius};

`;

export const AddRoomButton = styled.button`
	${components.button};
	width: 70px;
	border-left: none;
	border-radius: 0 ${length.radius} ${length.radius} 0;
`;

export const MessageRoomItem = styled.div`
	width: calc(100% - ${length.margin} * 2 - 24px);
	${layout.row};
	margin: ${length.margin};
	background-color: ${color.siteBG2};
	padding: 10px 12px;
	border-radius: ${length.radius};
	${cursor.clickable};
	height: 26px;
	${font.text};
	transition: background-color 0.1s;
	&:hover {
		background-color: ${color.siteBG1};
	}
	& span {
		line-height: 26px;
	}
`;
