import styled from 'styled-components';

import {
	color,
	colorAdjust,
	components,
	cursor,
	layout,
	length,
} from '../../../Styles/sharedStyles';


export const CreateThreadRow = styled.div`
	width: 90%;
	margin: 0 auto;
	${layout.row};
`;

export const NotificationIcon = styled.div`
	${components.notificationIcon};
`;

export const ThreadItem = styled.div`
	width: 90%;
	${layout.row};
	margin: ${length.margin} auto;
	background-color: ${color.siteBG2};
	padding: 10px 6px;
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
