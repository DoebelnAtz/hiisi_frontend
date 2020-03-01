import styled from 'styled-components';
import {
	color,
	colorAdjust,
	cursor,
	font,
	layout,
	length,
} from './SharedStyles';

export const Card = styled.div`
	${font.text};
	${layout.row};
	width: calc(100% - ${length.margin} * 2);
	border-radius: 8px;
	z-index: 1;
	min-height: 122px;
	background-color: ${color.siteBG2};
	margin: ${length.margin};
`;

export const CardVotes = styled.div`
	width: 55px;
	padding: 14px 0;
	border-right: 2px solid ${color.siteBG1};
	${layout.col};
`;

export const ArrowImage = styled.div`
	${layout.row};
	& img {
		height: 30px;
		width: 30px;
		margin: 0 auto;
		${cursor.clickable};
	}
`;

export const VoteCount = styled.div`
	${layout.row};
	& span {
		user-select: none;
		text-align: center;
		letter-spacing: 0;
		margin: 0 auto;
	}
`;

export const CardContent = styled.div`
	width: calc(100% - 124px);
	padding: 14px;
	display: flex;
	flex-direction: column;
	${cursor.clickable};
	z-index: 1;
	&:hover {
		background-color: ${colorAdjust.darken(color.siteBG2, 0.15)};
	}
`;

export const CardTitleInfo = styled.div`
	${layout.row};
`;

export const CardInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: auto;
	width: 30%;
`;

export const CardTitle = styled.span`
	${layout.row};
	font-size: 20px;
	width: 70%;
`;

export const CardAuthor = styled.div`
	${layout.row};
	color: #ffffff;
	margin-top: 4px;
	margin-left: auto;
`;

export const CardButtons = styled.div`
	width: 55px;
	padding: 14px 0;
	display: flex;
	flex-direction: column;
	border-left: 2px solid ${color.siteBG1};
`;

export const CardEdited = styled.span`
	${font.text};
	margin-top: 4px;
	margin-left: auto;
	font-size: 10px;
`;

export const CardDate = styled.span`
	margin-left: auto;
	font-size: 16px;
	padding-left: 10px;
	${layout.row};
`;

export const DeleteButton = styled.div`
	${layout.row};
	margin-bottom: 10px;
	& img {
		${cursor.clickable};
		margin: 0 auto;
		height: 30px;
		border-radius: 50%;
		background-color: ${color.siteBG2};
		transition: background-color 0.2s;
		&:hover {
			background-color: ${color.siteBG1};
		}
	}
`;

export const ShareButton = styled.div`
	${layout.row};

	& img {
		${cursor.clickable};
		margin: 0 auto;
		height: 30px;
		border-radius: 50%;
		background-color: ${color.siteBG2};
		transition: background-color 0.2s;
		&:hover {
			background-color: ${color.siteBG1};
		}
	}
`;

export const CopiedSpan = styled.span`
	position: relative;
	bottom: 0;
	transition: opacity 0.3s;
	user-select: none;
	opacity: ${(props) => (props.copied ? '1' : '0')};
`;
