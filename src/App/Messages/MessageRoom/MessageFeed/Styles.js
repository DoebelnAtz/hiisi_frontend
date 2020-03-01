import styled from 'styled-components';
import {
	color,
	components,
	font,
	layout,
	length,
} from '../../../../Styles/SharedStyles';

export const MessageFeedDiv = styled.div`
	background-color: ${color.siteBG2};
	height: 30vh;
	overflow-y: auto;
`;

export const LoadMoreButton = styled.button`
	margin: ${length.margin} auto 0 auto;
	${components.button};
`;

export const Message = styled.div`
	background-color: ${color.siteBG1};

	border-radius: ${(props) =>
		props.sender ? '5px 5px 0 5px' : '5px 5px 5px 0'};
	margin-left: ${(props) => (props.sender ? '15%' : '5px')};
	margin-right: ${(props) => (props.sender ? '5px' : '15%')};
	padding: 5px;

	word-break: break-word;
	margin-top: 10px;
	color: ${(props) => (props.sender ? color.secondary : color.tertiary)};
	font-size: 16px;
`;

export const MessageImg = styled.img`
	height: 30px;
	margin-right: 5px;
	border-radius: 4px;
`;

export const MessageDate = styled.span`
	margin-right: 5px;
	margin-left: auto;
`;

export const MessageInfo = styled.div`
	${layout.row};
	margin-right: 5px;
`;

export const MessageContent = styled.div`
	margin-top: 5px;
	& span a {
		${font.link};
	}
`;
