import styled from 'styled-components';
import { color, font, layout, length } from '../Styles/SharedStyles';

export const MainContainer = styled.div`
	max-width: 1900px;
	margin-right: auto;
	margin-left: auto;
	height: 100vh;
	width: calc(100vw - ${length.margin} * 2);
	overflow: hidden;
`;

export const MainPageHeader = styled.div`
	width: calc(100% - ${props => props.isMobile ? `${length.margin} * 2` : `0px`});
	margin: 0;
	border-radius: ${length.radius};
`;

export const MainPage = styled.div`
	max-width: 1900px;
	${layout.row};
	padding-bottom: ${length.margin};
	width: calc(100%);
	height: calc(100vh - 60px - ${length.margin} * 4);
	margin: 0;
	overflow-y: auto;
	overflow-x: hidden;
`;

export const ProductionStateLabel = styled.div`
	background-color: ${color.secondary};
	position: fixed;
	display: flex;
	flex-wrap: nowrap;
	top: 10px;
	right: -25px;
	opacity: 0.9;
	overflow: hidden;
	transform: rotateY(0deg) rotate(45deg);
	padding: 3px 25px 3px 25px;
	& span {
		padding: 2px;
		${font.text}
	}
`;

export const SideNavCol = styled.div`
	max-width: 300px;
	height: calc(100vh - 60px - ${length.margin} * 5);
	border-radius: ${length.radius};
	margin-right: ${length.margin};
	background-color: ${color.siteBG1};
`;

export const MainView = styled.div`
	border-radius: ${length.radius};
	width: calc(100% - 210px - ${length.margin} * 3);
	background-color: ${color.siteBG1};
	overflow-y: auto;
	overflow-x: hidden;

	height: calc(100vh - 60px - ${length.margin} * 4);
	transition: width 0.2s;
	@media (max-width: 1024px) {
		width: calc(100% - ${props => props.isMobile ? `0px` : `50px - ${length.margin} * 3`});
		height: calc(100% - ${props => props.isMobile ? `calc(7vh)` : `0px`});

	}
`;
