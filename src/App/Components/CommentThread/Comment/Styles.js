import styled from 'styled-components';

import {
	border,
	color,
	colorAdjust,
	components,
	cursor,
	font,
	layout,
	length,
} from '../../../../Styles/SharedStyles';

export const ParentComment = styled.div`
	margin-left: ${length.margin};
	margin-top: ${length.margin};
	background-color: ${(props) => (props.odd ? color.siteBG1 : color.siteBG2)};
	position: relative;
	padding-bottom: ${length.margin};
	border-radius: 26px ${length.radius} ${length.radius} ${length.radius};
`;

export const ButtonRow = styled.div`
	margin: 0 ${length.margin};
	${layout.row};
`;

export const ShowRepliesButton = styled.button`
	${components.button};
	width: 80px;
	height: 30px;
	line-height: 26px;
	margin-right: ${length.margin};
`;

export const CommentInfo = styled.div`
	position: absolute;
	height: 28px;
	top: 5px;
	line-height: 28px;
	left: 30px;
	z-index: 1;
	overflow-x: hidden;
	overflow-y: hidden;
	background-color: ${(props) => (props.odd ? color.siteBG2 : color.siteBG1)};
	padding-left: ${length.margin};
	width: auto;
	border-radius: 0 4px 4px 0;
	padding-right: 4px;
	& span {
		color: #ffffff;
		font-size: 14px;
		line-height: 28px;
		margin-left: 20px;
		margin-right: 10px;
	}
`;

export const CommentHead = styled.div`
	display: flex;
	flex-wrap: wrap;
	& img {
		${cursor.clickable};
		border: 5px solid
			${(props) => (props.odd ? color.siteBG1 : color.siteBG2)};
		position: relative;
		border-radius: 50%;
		width: 42px;
		height: 42px;
		z-index: 2;
	}
`;

export const DeleteCommentBtn = styled.div`
	color: ${(props) => (props.odd ? color.siteBG2 : color.siteBG1)};
	${cursor.clickable};
	font-size: 28px;
	margin-left: auto;
	&:hover {
		color: ${(props) => (props.odd 
	? colorAdjust.lighten(color.siteBG2, 0.1) 
	: colorAdjust.darken(color.siteBG1, 0.1))};
	}
`;

export const CommentBody = styled.div`
	margin: ${length.margin} ${length.margin} 0;
	${font.text};
	padding-bottom: ${length.margin};
`;

export const ReplyRow = styled.div`
	width: calc(100% - ${(props) => (props.full ? '90px' : '0px')});
`;

export const ChildComments = styled.div`
	padding-right: ${length.margin};
`;
