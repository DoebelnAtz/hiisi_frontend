import styled from 'styled-components';
import { color, components, cursor, layout, length } from '../../Styles/SharedStyles';

export const MessageModal = styled.div`
	color: white;
	border: 2px solid ${color.siteBG1};
	background-color: ${color.siteBG2};
	border-radius: 24px 0 5px 24px;
	width: 350px;
	height: calc(40px);
	${layout.row};
	${cursor.clickable};
	position: fixed;
	bottom: 0;
	z-index: ${42 + 42};
	right: 0;
	& span {
		line-height: 40px;
		margin-left: ${length.margin};
		font-size: 18px;
	}
`;

export const NotificationIcon = styled.div`
	${components.notificationIcon};
`;

export const MessageImg = styled.img`
	height: 40px;
	position: relative;
	left: 0;
`;
