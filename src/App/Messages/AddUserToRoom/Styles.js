import styled from 'styled-components';
import {
	color,
	components,
	cursor,
	font,
	layout,
	length,
} from '../../../Styles/sharedStyles';

export const AddUserDiv = styled.div`
	height: calc(30vh + 167px);
	padding: ${length.margin};
`;

export const NavigationDiv = styled.div`
	${layout.row};
	margin-bottom: ${length.margin};
`;

export const ChatRoomUsers = styled.div`
	${layout.row};
	margin-top: ${length.margin};
`;

export const GoBackButton = styled.button`
	${components.button};
`;

export const UserSearchInput = styled.input`
	${components.input};
	width: calc(100% - ${length.margin} - 3px);
`;

export const UserResult = styled.div`
	${layout.row};
	${cursor.clickable};
	margin: ${length.margin} 0;
	background-color: ${color.siteBG2};
	border-radius: 20px ${length.radius} ${length.radius} 20px;
`;

export const UserResultProfilePic = styled.img`
	height: 40px;
	width: 40px;
	border-radius: 20px;
`;

export const UserResultUsername = styled.span`
	${font.text};
	line-height: 40px;
	margin: 0 0 0 ${length.margin};
`;
