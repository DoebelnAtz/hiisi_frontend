import styled, { css } from 'styled-components';
import {
	color,
	colorAdjust,
	length,
	layout,
	components,
	border,
	cursor,
	font,
} from '../../../../../../Styles/SharedStyles';

export const TaskInfoHead = styled.div`
	${layout.row};
	height: 50px;
`;

export const TaskInfoBody = styled.div`
	height: calc(100% - 120px);
	width: calc(100%);
	${layout.row};
`;

export const TaskTitle = styled.div`
	${layout.row};
	font-size: 26px;
	color: ${color.primary};
	display: ${(props) => (props.editable ? 'none' : 'block')};
	border-color: ${color.siteBG2};
	background-color: ${color.siteBG2};
`;

export const TaskColorRow = styled.div`
	${layout.row};
	margin-bottom: ${length.margin};
`;

export const TaskColorTag = styled.div`
	background-color: ${(props) => props.tagColor || color.siteBG3};
	width: 10%;
	height: 20px;
	border-radius: ${length.radius};
`;

export const TaskColorPicker = styled.div`
	position: absolute;
	transform: translateY(30px);
`;

export const TaskFooter = styled.div`
	${layout.row};
	margin-top: auto;
	height: 50px;
	& input {
		margin-top: auto;
		margin-bottom: auto;
	}
`;

export const PriorityIcon = styled.img`
	width: 60px;
	height: 60px;
`;

export const TaskTitleEditable = styled.input`
	${layout.row};
	${components.input};
	font-size: 26px;
	width: 80%;
	padding-left: 0;
	margin-right: auto;
	border-color: ${color.siteBG2};
	background-color: ${color.siteBG2};
`;

export const PriorityDropdown = styled.div`
	margin: auto 0;
`;

export const AddUserInput = styled.input`
	${components.input};
`;

export const TaskDescription = styled.div`
	width: 70%;
	min-height: 40vh;
`;

export const TaskSidebar = styled.div`
	height: 100%;
	width: 30%;
`;

export const AddUserToTask = styled.div`
	${layout.row};
	padding: ${length.margin};
	padding-right: 0;
`;

export const TaskCollaborators = styled.div`
	margin-left: calc(${length.margin} * 2 - 4px);
	${layout.row}
`;

export const Collaborator = styled.img`
	width: 25%;
	max-width: 60px;
	margin-left: -10px;
	border-radius: 50%;
	${cursor.clickable};
	border: 4px solid ${color.siteBG2};
`;

export const AddUserBtn = styled.div`
	background-color: ${color.primary};
	width: 40px;
	padding: 0 8px 4px 8px;
	border-radius: 0 18px 18px 0;
	font-size: 24px;
	color: ${color.siteBG2};
`;

export const TaskStatusInput = styled.label`
	margin: auto 0;
	${font.text};

	& input {
		${components.input};
		background-color: ${color.siteBG2};
		height: 32px;
		padding-right: 7px;
		position: relative;
		${font.text};
		top: 1px;
	}
`;

export const AddUser = styled.div`
	${layout.row};
	${cursor.clickable};

	& img {
		height: 40px;
		width: 40px;
		margin-left: 8px;
		border-radius: 50% 0 0 50%;
		border: 2px solid ${color.primary};
	}
	& span {
		font-size: 18px;
		width: calc(100% - 40px - 48px);
		padding: 4px 12px 4px 12px;
		${border.setBorders(2, 2, 2, 0, color.primary)};
		letter-spacing: 1px;
		color: ${color.primary};
	}
	&:hover span {
		border-color: ${colorAdjust.darken(color.primary, 0.1)}!important;
	}

	&:hover img {
		border-color: ${colorAdjust.darken(color.primary, 0.1)}!important;
	}

	&:hover ${AddUserBtn} {
		background-color: ${colorAdjust.darken(color.primary, 0.1)}!important;
	}
`;
