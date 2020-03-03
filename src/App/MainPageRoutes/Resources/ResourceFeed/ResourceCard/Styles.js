import styled from 'styled-components';
import {
	color,
	colorAdjust,
	cursor,
	font,
	layout,
	length,
} from '../../../../../Styles/SharedStyles';

export const ResourceThumbnail = styled.div`
	width: 54px;
	height: 54px;
	margin-right: ${length.margin};
	border-radius: ${length.radius};
	background-image: url(${(props) => props.src});
	background-size: 54px;
	background-repeat: no-repeat;
	background-position: center;
	background-color: ${color.siteBG1};
`;

export const Tags = styled.div`
	margin-top: auto;
	${layout.row};
`;

export const ResourceRow = styled.div`
	${layout.row};
	height: 100%;
`;

export const ResourceTitleInfo = styled.div`
	${layout.row};
	width: calc(100% - ${(props) => (props.full ? '0px' : '64px')});
`;

export const Tag = styled.div`
	z-index: 2;
	${cursor.clickable};
	margin: 2px 4px 2px 0;
	background-color: ${(props) => props.color};
	padding: 4px 8px;
	border-radius: 4px;
	&:hover {
		background-color: ${(props) => colorAdjust.darken(props.color, 0.1)};
	}
	@media (max-width: 768px) {
		font-size: 2vw;
	}
`;
