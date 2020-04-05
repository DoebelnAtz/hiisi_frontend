import styled from 'styled-components';
import {
	border,
	color,
	colorAdjust,
	components,
	cursor,
	font,
	layout,
	length,
} from '../../../../Styles/SharedStyles';

export const ResourceHeader = styled.div`
	${layout.row};
	margin-top: ${length.margin};
`;

export const ResourceThumbnail = styled.div`
	width: 71px;
	height: 71px;
	margin-left: 4px;
	${cursor.clickable};
	border-radius: ${length.radius};
	background-image: url(${(props) => props.src});
	background-size: 74px;
	background-repeat: no-repeat;
	background-position: center;
	background-color: ${color.siteBG1};
`;

export const ResourceTitle = styled.div`
	${font.title};
	margin-left: ${length.margin};
	width: calc(100% - ${props => props.full ? '0px' : '91px'});
	color: ${color.primary};
	& :hover {
		text-decoration: none;
	}
	& a {
		${font.link};
	}
`;

export const ResourceTags = styled.div`
	${layout.row};
	margin: ${length.margin} ${length.margin} 0 4px;
`;

export const ResourceContent = styled.div`
	width: calc(100% - 4px * 2);
	min-height: 40vh;
	border-radius: ${length.radius};
	padding: ${length.margin} 0;
	margin: 4px;
	${layout.row};
`;

export const ResourceDescription = styled.div`
	${font.text};
	background-color: ${color.siteBG3};
	width: calc(${(props) => (props.full ? '100%' : '60%')});
`;

export const AddTagInput = styled.input`
	${components.input};
	width: calc(100% - ${length.margin} - 3px);
	margin-left: ${length.margin};
`;

export const ResourceTag = styled.div`
	z-index: 2;
	margin-right: ${(props) => (props.owner ? '14px' : '8px')};
	border-radius: ${(props) => (props.owner ? '4px 0 0 4px' : '4px')};
	background-color: ${(props) => props.color};
	${font.text};
	margin-bottom: 4px;
	height: 26px;
	${layout.row};
	padding: 0 8px;
	& span {
		${font.text};
		line-height: 26px;
	}
`;

export const DeleteTagButton = styled.div`
	display: ${(props) => (props.owner ? 'block' : 'none')};
	background-color: ${(props) => props.color};
	border-radius: 0 4px 4px 0;
	border-left: 1px solid ${color.siteBG2};
	width: 26px;
	height: 26px;
	position: relative;
	right: -12px;
	font-size: 16px;
	line-height: 26px;
	${cursor.clickable};
	text-align: center;
	&:hover {
		background-color: ${(props) => colorAdjust.darken(props.color, 0.1)};
	}
`;

export const SearchResultTag = styled.div`
	z-index: 2;
	margin: 10px;
	${layout.row};
	background-color: ${(props) => props.color};
	${font.text};
	height: 30px;
	padding: 2px 6px;
	width: calc(100% - 16px);
	border-radius: 4px;
	${cursor.clickable};
	& span {
		white-space: nowrap;
		overflow: hidden;
		margin-left: 4px;
		max-width: calc(100% - 16px);
		text-overflow: ellipsis !important;
		line-height: 30px;
		&:hover {
			color: lightgray;
		}
	}
	&:hover{
		background-color: ${props => colorAdjust.darken(props.color, 0.1)};
	}
`;

export const TagSearchResults = styled.div`
	width: calc(40% - ${length.margin});
`;

export const ResourceComments = styled.div`
	margin: 0 4px 0 4px;
	width: calc(100% - 4px * 2);
`;
