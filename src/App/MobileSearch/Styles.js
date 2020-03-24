import styled from 'styled-components';
import {
	color, colorAdjust,
	components,
	cursor,
	font,
	layout,
	length,
} from '../../Styles/SharedStyles';

export const SearchDiv = styled.div`
	${layout.row};
	position: relative;
	z-index: 5;
	margin: auto ${length.margin} auto ${length.margin};
	& label {
		${font.text};
	}
`;

export const SearchInput = styled.input`
	${components.input};
	height: 34px;
	margin-top: ${length.margin};
	border-radius: ${(props) =>
		!props.showingResults ? '4px' : '4px 4px 0 0'};
	width: 100vw;
`;

export const SearchResults = styled.div`
	display: ${(props) => (props.showingResults ? 'block' : 'none')};
	position: absolute;
	width: calc(100% - 2px);
	z-index: 10;
	overflow-y: auto;
	top: 46px;
	max-height: 50vh;
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
