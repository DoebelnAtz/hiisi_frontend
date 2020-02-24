import styled from 'styled-components';
import {
	color, colorAdjust,
	components,
	cursor,
	font,
	layout,
	length,
} from '../../../Styles/sharedStyles';

export const SearchDiv = styled.div`
	${layout.row};
	position: relative;
	margin: auto ${length.margin} auto ${length.margin};
	& label {
		${font.text};
	}
`;

export const SearchInput = styled.input`
	${components.input};
	height: 36px;
	border-radius: ${(props) =>
		!props.showingResults ? '4px' : '4px 4px 0 0'};
	min-width: 200px;
	max-width: 300px;
	width: 20vw;
`;

export const SearchResults = styled.div`
	display: ${(props) => (props.showingResults ? 'block' : 'none')};
	position: absolute;
	max-height: 200px;
	z-index: 10;
	overflow-y: auto;
	top: 35px;
	width: calc(20vw + 11px);
	min-width: 210px;
	max-width: 310px;
	border-radius: 0 0 4px 4px;
	border: 1px solid ${color.primary};
	background-color: ${color.siteBG2};
`;

export const ResultItem = styled.div`
	${layout.row};
	background-color: ${props => props.highlighted ? color.siteBG3 : color.siteBG1};
	margin: 6px;
	${font.text};
	font-size: 14px;
	${cursor.clickable};
	border-radius: 15px ${length.radius} ${length.radius} 15px;
	&:hover {
		transition: background-color 0.1s;
		background-color: ${colorAdjust.lighten(color.siteBG1, 0.15)};
	}
	& span {
		padding-left: 5px;;
		line-height: 30px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		width: calc(100% - 30px - 12px);
	}
	& img {
		height: 30px;
		width: 30px;
	}
`;
