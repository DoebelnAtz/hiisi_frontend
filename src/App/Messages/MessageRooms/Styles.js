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
	calc(width: 100% - 18px);
	
	${layout.row};
`;

export const NotificationIcon = styled.div`
	${components.notificationIcon};
`;

export const ThreadItem = styled.div`
	width: calc(100% - 24px);
	${layout.row};
	margin: ${length.margin} auto;
	background-color: ${color.siteBG2};
	padding: 10px 12px;
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
