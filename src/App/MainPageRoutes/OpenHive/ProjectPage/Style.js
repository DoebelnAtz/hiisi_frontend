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
	width: calc(100%);
	height: calc(100% );
	background-color: ${color.siteBG1};
`;

export const BackToProjectsButton = styled.div`
	${components.button};
	height: 30px;
	z-index: 2;
	margin-right: ${length.margin};

	& img {
		margin: auto ${length.margin} auto 4px;
		height: 20px;
		width: 20px;
	}
`;

export const ProjectInfo = styled.div`
	${layout.row};
	height: 34px;
	bottom: ${length.margin};
	width: 100%;
`;

export const ProjectDescription = styled.div`
	margin: ${length.margin} 0;
`;

export const ProjectTitle = styled.div`
	${font.title};
	${layout.row};
	margin: ${length.margin} 0;
	z-index: 1;
	width: 100%;
	span {
		margin: 0 auto;

`;

export const GitHubLink = styled.div`
	${components.button};
	height: 30px;
	margin-left: auto;
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
