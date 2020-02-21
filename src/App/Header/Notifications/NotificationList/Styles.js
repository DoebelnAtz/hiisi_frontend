import styled from 'styled-components';
import { color, font, layout, length } from '../../../../Styles/sharedStyles';

export const NotificationListDiv = styled.div`
	width: 200px;
	position: absolute;
	max-height: 20vh;
	overflow-y: auto;
	top: 60px;
	background-color: ${color.siteBG3};
`;

export const NotificationItem = styled.div`
	${layout.row};
	${font.text};
	margin: ${length.margin} 0;
`;
