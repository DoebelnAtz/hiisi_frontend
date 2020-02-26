import styled from 'styled-components';

import {
	color,
	length,
	layout,
	font,
	components,
} from '../../../Styles/SharedStyles';

export const MessageNavigation = styled.div`
	${layout.row};
	margin: ${length.margin} ${length.margin} 5px ${length.margin};
`;

export const GoBackButton = styled.button`
	${components.button};
	margin-right: auto;
`;

export const AddUserToChatBtn = styled.button`
	${components.button};
	margin-left: auto;
`;

export const ChatRoomUsers = styled.div`
	${layout.row};
	margin: 0 ${length.margin} -${length.margin} ${length.margin};
`;

export const MessageRoomDiv = styled.div``;

export const MessageRoomName = styled.span`
	${font.text};
	margin: ${length.margin};
	font-size: 18px;
	line-height: 30px;
`;

export const MessageFeedDiv = styled.div`
	background-color: ${color.siteBG2};
	height: 30vh;
	overflow-y: auto;
`;

export const ConnectedUser = styled.div`
	& img {
		height: 38px;
		margin-right: -${length.margin};
		border: 4px solid ${color.siteBG3};
		border-radius: 24px;
	}
`;

export const ConnectedDot = styled.div`
	background-color: ${(props) => (props.active ? 'lightgreen' : 'lightgrey')};
	height: 8px;
	width: 8px;
	position: relative;
	bottom: 14px;
	left: 6px;
	border-radius: 4px;
`;

export const MessageInputSend = styled.div`
	${layout.row};
	margin: ${length.margin};
`;

export const MessageInputTextArea = styled.textarea`
	${components.textarea};
	resize: vertical;
	height: calc(38px - 12px);
	max-height: 10vh;
	width: calc(70%);
	font-size: 14px;
	border-radius: ${length.radius};
`;

export const SendButton = styled.button`
	${components.button};
	height: 38px;
	width: calc(30% - ${length.margin} - 12px);
	margin-left: ${length.margin};
`;
