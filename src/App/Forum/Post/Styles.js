import styled from 'styled-components';
import {
	color,
	colorAdjust,
	components,
	cursor,
	font,
	layout,
	length,
} from '../../../Styles/sharedStyles';

export const BlogPost = styled.div`
	${font.text};
	${layout.row};

	color: ${color.primary};
	margin: 0 ${length.margin} ${length.margin} ${length.margin};
	width: calc(100% - ${length.margin} * 2);

	border-radius: ${length.radius};
	background-color: ${color.siteBG2};
`;

export const PostVotes = styled.div`
	width: 41px;
	padding: 14px 0;
	border-right: 1px solid ${color.siteBG1};
	${layout.col};
`;

export const PostContent = styled.div`
	width: calc(100% - 94px);
	padding: 14px;
	${layout.row};

	${cursor.clickable};
	z-index: 1;
	&:hover {
		background-color: ${color.siteBG1};
	}
`;

export const PostTitle = styled.div`
	${font.title};
	color: #ffffff;
	font-size: 24px;
`;

export const PostButtons = styled.div`
	width: 55px;
	padding: 14px 0;
	display: flex;
	flex-direction: column;
	border-left: 1px solid ${color.siteBG1};
`;

export const PostInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: auto;
`;

export const PostAuthor = styled.div`
	${layout.row};
	color: #ffffff;

	margin-left: auto;
`;

export const PostDate = styled.div`
	${layout.row};
	color: #ffffff;
	margin-left: auto;
`;

export const ButtonRow = styled.div`
	${layout.row};
	width: 100%;
	border-radius: 0 0 5px 5px;
	& button {
		width: 50%;
		border-radius: 0;
		& i {
			margin-right: ${length.margin};
		}
	}
`;

export const CommentButton = styled.button`
	${components.button};
	border-right: none;
`;

export const CommentSection = styled.div`
	padding: ${length.margin};
`;

export const LikeButton = styled.button`
	${components.button};
`;
