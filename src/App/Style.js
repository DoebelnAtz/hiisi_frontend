import styled from 'styled-components';
import { color, font, layout, length } from '../Styles/SharedStyles';

export const MainContainer = styled.div`
	max-width: 1900px;
	margin-right: auto;
	margin-left: auto;
	height: 100%;
	padding: 0 ${props => !props.isMobile ? length.margin : '0'};
	width: calc(100%- ${length.margin} * 2);
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
	${props => !props.isMobile && `padding-bottom: ${length.margin}`};
	width: calc(100%);
	height: calc(100% - ${props => props.isMobile ? '30px' :'70px'} - ${length.margin} * 3);
	margin: 0;
	overflow-y: hidden;
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
	height: calc(100% - ${length.margin});
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
	margin-bottom: auto;
	height: calc(100%);
	transition: width 0.2s;
	@media (max-width: 1024px) {
		width: calc(100% - ${props => props.isMobile ? `0px` : `50px - ${length.margin} * 3`});
	}
`;
