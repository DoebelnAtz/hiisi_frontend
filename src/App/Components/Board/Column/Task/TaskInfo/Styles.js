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

export const TaskComments = styled.div`
	width: 100%;
`;

export const PriorityText = styled.span`
	${font.text};
	margin-left: auto;
	margin-right: ${length.margin};
	font-size: 20px;
	line-height: 35px;
	color: ${color.primary};
`

export const PrioritySetting = styled.div`
	${layout.row};
	width: 100%;
`;

export const PriorityIcon = styled.img`
	width: 34px;
	height: 34px;
	margin-left: ${length.margin};
`;

export const TaskTitleEditable = styled.input`
	${layout.row};
	${components.input};
	font-size: 26px;
	width: 100%;
	padding-left: 0;
	margin-right: auto;
	border-color: ${color.siteBG2};
	background-color: ${color.siteBG2};
`;

export const PriorityDropdown = styled.div`
	margin-left: auto;
	margin-right: -${length.margin};
`;

export const AddUserInput = styled.input`
	${components.input};
`;

export const TaskDescription = styled.div`
	width: calc(100% - 250px - ${length.margin});
	min-height: 40vh;
`;

export const TaskSidebar = styled.div`
	height: 100%;
	margin-left: ${length.margin};
	width: 250px;
`;

export const TaskSetting = styled.div`
	${layout.row};
	padding-bottom: ${length.margin};
	margin-bottom: ${length.margin};
	border-bottom: 1px solid ${color.siteBG3};
`;

export const TaskStatusInput = styled.label`
	margin-left: ${length.margin};
	${font.text};
	${layout.row};
	width: 100%;
	line-height: 32px;
	& input {
		${components.input};
		background-color: ${color.siteBG2};
		height: 32px;
		width: 150px;
		margin-left: auto;
		padding-right: 7px;
		position: relative;
		${font.text};
		top: 1px;
	}
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
	width: 48px;
	height: 48px;
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

export const AddUser = styled.div`
	${layout.row};
	${cursor.clickable};
	margin-bottom: ${length.margin};
	background-color: ${color.siteBG5};
	height: 40px;
	margin-left: ${length.margin};
	border-radius: 20px 4px 4px 20px;
	& img {
		height: 40px;
		width: 40px;
		border-radius: 20px;
	}
	& span {
		width: calc(100% - 40px - 48px);
		${font.text};
		margin: auto 0 auto ${length.margin};
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
