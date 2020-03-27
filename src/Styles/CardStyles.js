import styled from 'styled-components';
import {
	color,
	colorAdjust,
	cursor,
	font,
	layout,
	length,
} from './SharedStyles';

export const Feed = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	@media (min-width: 1367px) {
		& > div:nth-child(2n + 1) {
			margin-right: ${length.margin};
		}
	}
`;

export const Card = styled.div`
	${font.text};
	${layout.row};
	width: calc(100%);
	border-radius: 8px;
	box-shadow: 2px 2px 3px rgba(0,0,0,0.2);
	z-index: 1;
	min-height: 100px;
	background-color: ${color.siteBG2};
	margin: ${length.margin} 0;
	@media (min-width: 1367px) {
		width: calc(50% - 5px);
	}
`;

export const CardVotes = styled.div`
	width: 55px;
	padding: 14px 0;
	border-right: 2px solid ${color.siteBG1};
	${layout.col};
	@media (min-width: 1367px) {
		width: calc(50% - 20px);
	}
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
	padding: 10px;
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
	width: 120px;
	font-size: 14px;
	@media (max-width: 768px) {
		width: 90px;
		font-size: 14px;
	}
`;

export const CardTitle = styled.span`
	${layout.row};
	font-size: 18px;
	width: calc(100% - 120px);
	@media (max-width: 768px) {
		font-size: 16px;
		width: calc(100% - 90px);
	}
`;

export const CardAuthor = styled.div`
	${layout.row};
	${font.text};
	font-size: inherit;
	margin-top: 4px;
	margin-left: auto;
	${font.text};
	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

export const CardButtons = styled.div`
	width: 51px;
	padding: 14px 0;
	display: flex;
	flex-direction: column;
	border-left: 2px solid ${color.siteBG1};
`;

export const CardEdited = styled.span`
	${font.text};
	margin-top: 4px;
	text-align: right;
	margin-left: auto;
	font-size: 10px;
`;

export const CardDate = styled.span`
	margin-left: auto;
	padding-left: 10px;
	text-align: right;
	${layout.row};
	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

export const DeleteButton = styled.div`
	${layout.row};
	width: 100%;
	margin-bottom: 10px;
	& img {
		${cursor.clickable};
		margin: 0 auto;
		height: 26px;
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
		height: 26px;
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
	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

export const MoreButton = styled.div`
	${layout.row};
	width: calc(100%);
	& img {
		${layout.centered};
		${cursor.clickable};
		margin: 0 auto;
		height: 54px;
		width: 54px;
	}
`;
