import styled from 'styled-components';
import {
	color,
	colorAdjust,
	components,
	cursor,
	font,
	layout,
	length,
} from '../../../Styles/SharedStyles';

export const Resources = styled.div`

`;

export const ResourceTabbedView = styled.div`
	
	background-color: ${color.siteBG1};
`;

export const ResourceTabs = styled.div`
	${layout.row};
	padding: 5px 5px 0 5px;
	background-color: ${color.siteBG2};
`;

export const ResourceTab = styled.div`
	height: 40px;
	${font.text};
	line-height: 40px;
	padding-left: 5%;
	margin-left: -5%;
	width: 10%;
	border-radius: 5px 20px 0 0;
	box-shadow: 2px 0 2px -1px black;
	text-align: center;
	background-color: ${props => props.active ? color.siteBG1 : colorAdjust.darken(color.siteBG2, 0.12)};

`;

export const ResourceActiveTab = styled.div`
	border-top: none;
	padding: 5px;
`;

export const SubmitResourceButton = styled.button`
	${components.button};
	width: ${props => props.isMobile ? `calc(100%)` : 'fit-content'};
	height: 34px;
	padding: 0 10px;
	margin: ${props => props.isMobile ? `0 0 ${length.margin} 0` : `0 ${length.margin} 0 0`};
	line-height: 28px;
`;

export const FilterButton = styled.button`
	${components.button};
	width: fit-content;
	margin-left: auto;
	height: 34px;
	line-height: 26px;
	@media (max-width: 731px) {
		margin-top: ${length.margin};
		margin-left: 0;
	}
`;

export const ResourcePageHead = styled.div`
	${layout.row};
	display: flex;
	flex-wrap: wrap;
`;

export const ResourceFilters = styled.div`
 	${layout.row};
 	flex-wrap: nowrap;
 	overflow: visible;
 	
`;
