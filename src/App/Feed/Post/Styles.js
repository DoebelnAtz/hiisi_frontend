import styled from 'styled-components';
import { color, colorAdjust, components, font, layout, length } from '../../../Styles/sharedStyles';

export const BlogPost = styled.div`
	${font.text};
	color: ${color.primary};
	display: flex;
	flex-direction: column;
	margin: 0 ${length.margin} ${length.margin} ${length.margin};
    
    border-radius: ${length.radius};
    background-color: ${color.siteBG2};
`;

export const PostHead = styled.div`
	${layout.row};
	padding: ${length.margin};
`;

export const PostTitle = styled.div`
	${layout.row};
	${font.title};
	font-size: 24px;
`;

export const PostInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: auto;
`;

export const PostAuthor = styled.div`
	${layout.row};
	margin-left: auto;

`;

export const PostDate = styled.div`
	${layout.row};
	margin-left: auto;
`;

export const PostContent = styled.div`
	${layout.row};
	padding: ${length.margin};
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

export const LikeButton = styled.button`
	${components.button};
`;
