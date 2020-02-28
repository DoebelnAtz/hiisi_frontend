import styled from 'styled-components';
import {
	color,
	cursor,
	length,
	layout,
	border,
	font,
	components,
	colorAdjust,
} from '../../../../Styles/SharedStyles';

export const ProjectPage = styled.div`
	color: white;
	display: flex;
	flex-flow: column;
	width: calc(100% - ${length.margin} * 2);
	height: calc(100% - ${length.margin} * 2);
	padding: ${length.margin};
	background-color: ${color.siteBG1};
`;

export const BackToProjectsButton = styled.div`
	${components.button};
	height: 30px;
	margin-right: ${length.margin};
	& img {
		margin: auto ${length.margin} auto 4px;
		height: 20px;
		width: 20px;
	}
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

export const GitIconDiv = styled.div`
	background-color: #ffffff;
	border-radius: 7px;
	padding: 0 4px;
	margin: auto 0;
	& img {
		height: 24px;
		width: 24px;
	}
`;

export const GitHubLink = styled.div`
	${layout.row};
	background-color: #ffffff;
	border: 4px solid black;
	border-radius: 7px;
	${cursor.clickable};
	padding-right: 4px;
	& a {
		margin: auto 0;
		font-size: 18px;
		text-decoration: none;
		color: #000;
	}
`;

export const ProjectDashboardNav = styled.div`
	${layout.row};
	${cursor.clickable};
	border-radius: 6px 6px 0 0;
	overflow: hidden;
	background: linear-gradient(
		0deg,
		${color.siteBG2} 50%,
		${colorAdjust.lighten(color.siteBG1, 0.15)} 50%
	);
`;

export const ProjectDashBoardNavItem = styled.div`
	${layout.col};
	display: flex;
	border-radius: ${(props) => (props.focus ? '6px 6px 0 0' : '0')};
	padding: 5px;
	z-index: ${(props) => (props.focus ? 4 : 5)};
	justify-content: center;
	background-color: ${(props) =>
		props.focus ? color.siteBG2 : colorAdjust.lighten(color.siteBG1, 0.15)};

	&:hover {
		border-radius: 6px 6px 0 0;
		background-color: ${(props) =>
			props.focus
				? color.siteBG2
				: colorAdjust.lighten(color.siteBG1, 0.25)};
	}
`;

export const DashBoard = styled.div`
	padding: ${length.margin};
	background-color: ${color.siteBG2};
	height: calc(100% - ${length.margin} * 5);
`;

export const ProjectDashBoard = styled.div`
	flex-grow: 1;
	border-radius: 6px;
`;
