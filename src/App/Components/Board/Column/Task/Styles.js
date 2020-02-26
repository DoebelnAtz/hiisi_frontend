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

export const TaskStatus = styled.div`
	margin-top: ${length.margin};
	${layout.row}
	& img {
		height: 28px;
		width: 28px;
	}
`;

export const TaskStatusText = styled.div`
	position: static;
	visibility: hidden;
	width: auto;
	& span {
		padding: 7px;
		position: relative;
		bottom: 55px;
		right: 5px;
		border: 1px solid ${color.siteBG2};
		border-radius: 4px;
		background-color: ${color.siteBG5};
	}
`;

export const TaskStatusTooltip = styled.div`
	position: absolute;
	& img {
		position: relative;
		background-color: ${color.siteBG2};
		border-radius: 10px;
		top: -15px;
		left: -20px;
		height: 20px;
		width: 20px;
	}
	&:hover {
		& ${TaskStatusText} {
			visibility: visible;
		}
	}
`;

export const TaskCollaborators = styled.div`
	${layout.row};
	margin-left: auto;
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
	padding: 10px;
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

	${(props) =>
		props.isBeingDragged &&
		css`
			border: 2px solid ${color.siteBG3};
			background-color: ${colorAdjust.lighten(color.siteBG2, 0.5)};
			transform: scale(1.2);
			z-index: 100 !important;
		`}
`;

export const TaskTitle = styled.div`
	width: calc(100% - 24px);
	& span {
		font-size: 16px;
	}
`;

export const DeleteTaskImg = styled.div`
	height: 24px;
	width: 24px;
	& img {
		border-radius: 12px;
		background-color: ${color.siteBG2};
		height: 24px;
		width: 24px;
		transition: background-color 0.1s;
		&:hover {
			background-color: ${color.siteBG1};
		}
	}
`;
