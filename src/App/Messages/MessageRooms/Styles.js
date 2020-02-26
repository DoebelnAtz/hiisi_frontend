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
	width: calc(100% - ${length.margin} * 2 -2px	);
	margin: ${length.margin};

	${layout.row};
`;

export const NotificationIcon = styled.div`
	${components.notificationIcon};
`;

export const ThreadItem = styled.div`
	width: calc(100% - ${length.margin} * 2 - 24px);
	${layout.row};
	margin: ${length.margin};
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
