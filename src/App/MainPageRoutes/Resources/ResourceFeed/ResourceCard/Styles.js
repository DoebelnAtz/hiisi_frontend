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
	width: 68px;
	height: 68px;
	margin-right: ${length.margin};
	border-radius: ${length.radius};
	background-image: url(${(props) => props.src});
	background-size: 68px;
	background-repeat: no-repeat;
	background-position: center;
	background-color: ${color.siteBG1};
`;

export const Tags = styled.div`
	margin-top: ${length.margin};
	${layout.row};
`;

export const ResourceRow = styled.div`
	${layout.row};
	height: 100%;
`;

export const ResourceTitleType = styled.div`
	display: flex;
	flex-direction: column;
	width: calc(100% - 130px);
`;

export const ResourceTitle = styled.span`
	${font.text};
	word-break: break-word;
	font-size: 18px;
`;

export const ResourceType = styled.span`
	${font.text};
	margin-top: 5px;
	font-size: 14px;
`;

export const ResourceTitleInfo = styled.div`
	${layout.row};
	width: calc(100% - ${(props) => (props.full ? '0px' : '78px')});
`;

export const Tag = styled.div`
	z-index: 2;
	${cursor.clickable};
	margin: 2px 2px 2px 2px;
	background-color: ${(props) => props.color};
	padding: 2px 8px;
	height: 20px;
	text-align: center;
	border-radius: 4px;
	& span {
		line-height: 20px;
		font-size: 14px;
	}
	&:hover {
		background-color: ${(props) => colorAdjust.darken(props.color, 0.1)};
	}
	@media (max-width: 768px) {
		font-size: 2vw;
	}
`;
