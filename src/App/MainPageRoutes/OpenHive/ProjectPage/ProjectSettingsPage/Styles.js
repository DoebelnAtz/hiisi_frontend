import styled from 'styled-components';
import {
	color,
	colorAdjust,
	components,
	cursor,
	font,
	layout,
	length,
} from '../../../../../Styles/SharedStyles';

export const ProjectCollaborators = styled.div`
	${layout.row};
	margin: 8px;
	z-index: 0;
	& img {
		height: 42px;
		width: 42px;
		border-radius: 50%;
		margin-left: -8px;
		border: 4px solid ${color.siteBG2};
	}
`;

export const AddCollaboratorInput = styled.label`
	${layout.row};
	& input {
		margin-left: auto;
		${components.input};
	}
`;

export const Collaborator = styled.div`
	&:hover {
		${cursor.clickable};
	}
`;

export const UserResultList = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	margin-left: 5px;
	margin-top: ${length.margin};
`;

export const UserResult = styled.div`
	background-color: ${color.siteBG4};
	width: calc(50% - ${length.margin});
	${layout.row};
	border-radius: 20px 4px 4px 20px;
	margin: 0 ${length.margin} ${length.margin} 0;
	height: 40px;
	${cursor.clickable};
	&:hover {
		transition: background-color 0.1s;
		background-color: ${color.siteBG3};
	}
	& img {
		height: 40px;
		width: 40px;
		border-radius: 50%;
	}
	& span {
		${font.text};
		margin: auto 0 auto ${length.margin};
	}
`;

export const DeleteProjectButton = styled.div`
	${components.button};
	height: 28px;
`;

export const OptionRow = styled.div`
	${layout.row};

	border-bottom: 2px solid ${color.siteBG3};
	padding: ${length.margin};
	height: 34px;
	& label {
		line-height: 34px;
		${layout.row};
		width: 100%;
	}
	& label input {
		${components.input};
		border-color: ${color.siteBG1};
		background-color: ${color.siteBG2};
		margin-left: auto;
		height: 30px;
		width: 30vw;
		${font.text};
		min-width: fit-content;
		max-width: 400px;
		padding-right: 5px;
	}
`;
