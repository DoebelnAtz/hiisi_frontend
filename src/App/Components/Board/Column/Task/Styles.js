import styled, { css } from 'styled-components';
import {
	color,
	colorAdjust,
	cursor,
	layout,
	length,
} from '../../../../../Styles/SharedStyles';

export const TaskContent = styled.div`
	display: block;
	margin-top: 0;
	z-index: 100 !important;
`;

export const TaskStatusRow = styled.div`
	${layout.row};
	padding: 4px 2px 4px 4px;
	border-radius: ${length.radius};
	margin-bottom: 4px;
	background-color: ${colorAdjust.lighten(color.siteBG2, 0.2)};
`;

export const TaskStatusText = styled.div`
	position: static;
	visibility: hidden;
	width: fit-content;
	white-space: nowrap;
	& span {
		z-index: 6;
		padding: 7px;
		position: relative;
		bottom: 55px;
		right: 5px;
		border: 1px solid ${color.siteBG2};
		border-radius: 4px;
		background-color: ${color.siteBG5};
	}
`;

export const TaskStatusImg = styled.div`
	height: 20px;
	width: 20px;
	margin: auto ${length.margin} auto 0;
	& img {
		position: relative;
		background-color: ${color.siteBG2};
		border-radius: 10px;
		height: 20px;
		width: 20px;
		&:hover {
			border-radius: 10px;
			transition: background-color 0.1s;
			background-color: ${color.siteBG1};
		}
	}
	&:hover {
		& ${TaskStatusText} {
			visibility: visible;
		}
	}
`;

export const DeleteTaskImg = styled.div`
	height: 20px;
	width: 20px;
	margin: auto ${length.margin} auto 0;

	& img {
		border-radius: 12px;
		background-color: ${color.siteBG2};
		height: 20px;
		width: 20px;
		transition: background-color 0.1s;
		&:hover {
			background-color: ${color.siteBG1};
		}
	}
`;

export const TaskPriority = styled.div`
	height: 24px;
	width: 24px;
	margin: auto 0 auto auto;
	& img {
		height: 24px;
		width: 24px;
	}
`;

export const TaskCollaborators = styled.div`
	${layout.row};
	margin-left: 8px;
	& img {
		transition: border 0.3s;
		height: 28px;
		width: 28px;
		margin-left: -8px;
		border-radius: 50%;
		border: 3px solid ${color.siteBG4};
	}
`;

export const Task = styled.div`
	padding: 2px;
	margin: 0 0;
	border: 4px solid ${color.siteBG2};
	color: white;
	border-radius: 8px;
	transition: all 0.3s;
	${cursor.clickable};
	background-color: ${color.siteBG4};
	z-index: 100;

	&:hover {
		background-color: ${colorAdjust.lighten(color.siteBG3, 0)};
	}
	&:hover ${TaskCollaborators} img {
		border: 3px solid ${color.siteBG3};
	}

	&:hover ${TaskStatusRow} {
		background-color: ${color.siteBG3};
	}

	${(props) =>
		props.isBeingDragged &&
		css`
			border: 2px solid ${color.siteBG3};
			background-color: ${color.siteBG3};
			transform: scale(1.2);
			z-index: 100 !important;
			${TaskStatusRow} {
				background-color: ${color.siteBG3};
			}
		`}
`;

export const TaskTitle = styled.div`
	margin: 4px;
	width: calc(100% - 24px);
	& span {
		font-size: 16px;
	}
`;
