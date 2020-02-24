import styled from 'styled-components';
import {
	color,
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
	width: 20vw;
	min-width: 210px;
	max-width: 310px;
	border-radius: 0 0 4px 4px;
	border: 1px solid ${color.primary};
	background-color: ${color.siteBG2};
`;

export const ResultItem = styled.div`
	${layout.row};
	background-color: ${color.siteBG1};
	padding: 8px;
	margin: 6px;
	${font.text};
	font-size: 14px;
	${cursor.clickable};
	border-radius: ${length.radius};
	& span {
		width: 15vw;
		min-width: 150px;
		max-width: 250px;
	}
	& img {
		height: 30px;
		width: 30px;
	}
`;
