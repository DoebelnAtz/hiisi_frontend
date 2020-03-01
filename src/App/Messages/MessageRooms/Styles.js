import styled from 'styled-components';

import {
	color,
	colorAdjust,
	components,
	cursor,
	layout,
	length,
} from '../../../Styles/SharedStyles';

export const CreateThreadRow = styled.div`
	width: calc(100% - ${length.margin} * 2 -2px);
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

export const ThreadItem = styled.div`
	width: calc(100% - ${length.margin} * 2 - 24px);
	${layout.row};
	margin: ${length.margin};
	background-color: ${color.siteBG2};
	padding: 10px 12px;
	border-radius: ${length.radius};
	${cursor.clickable};
	height: 26px;
	transition: background-color 0.1s;
	&:hover {
		background-color: ${color.siteBG1};
	}
	& span {
		line-height: 26px;
		color: ${color.primary};
	}
`;
