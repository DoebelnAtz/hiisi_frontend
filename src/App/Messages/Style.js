import styled from 'styled-components';
import { color, components, cursor, layout, length } from '../../Styles/sharedStyles';

export const MessageModal = styled.div`
	color: white;
	border: 1px solid ${color.primary};
	background-color: ${color.siteBG2};
	padding: 4px 0;
	border-radius: 20px 0 5px 20px;
	width: 350px;
	height: calc(40px - 10px);
	${layout.row};
	${cursor.clickable};
	position: fixed;
	bottom: 0;
	z-index: ${42 + 42};
	right: 0;
	& span {
	
		padding: 3px ${length.margin} 8px;
		font-size: 18px;
	}
`;

export const NotificationIcon = styled.div`
	${components.notificationIcon};
`;

export const MessageImg = styled.img`
	height: 40px;
	position: relative;
	bottom: 5px;
	left: 0;
`;
