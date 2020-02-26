import styled, { css } from 'styled-components';
import {
	color,
	colorAdjust,
	cursor,
	length,
	layout,
	border,
	font, components,
} from '../../../../Styles/SharedStyles';

export const ProjectPage = styled.div`
	color: white;
	width: calc(100% - ${length.margin} * 2);
	height: calc(100% - ${length.margin} * 2);
	padding: ${length.margin};
	background-color: ${color.siteBG1};
`;

export const ProjectInfo = styled.div`
	${layout.row};
`;

export const ProjectDescription = styled.div`
	margin: ${length.margin} 0;

`;

export const ProjectTitle = styled.div`
	${layout.centered};
	${font.title};
`;

export const ProjectLink = styled.div`
	& a {
		${font.link};
		font-size: 20px;
	}
`;

export const ProjectDashboardNav = styled.div`
	${layout.row};
	${cursor.clickable};
	${border.setBorders(1, 1, 0, 1, color.primary)};
	& div:nth-child(2) {
		${border.setBorders(0, 1, 1, 1, color.primary)}
	}
`;

export const ProjectDashBoardNavItem = styled.div`
	${layout.col};
	border-bottom: 1px solid ${color.primary};
	display: flex;
	padding: 5px;
	z-index: 5;
	justify-content: center;
	background-color: ${props => props.focus? color.siteBG2 : color.siteBG1};

	&:hover {
		background-color: ${color.siteBG3};
	}
`;

export const SaveButton = styled.button`
 	${components.button};
`;
export const ProjectDashBoard = styled.div``;
