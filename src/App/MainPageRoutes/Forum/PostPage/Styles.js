import styled from 'styled-components';
import { layout, font, color, length, cursor } from '../../../../Styles/SharedStyles';

export const PostHead = styled.div`
	${layout.row};
	margin-bottom: ${length.margin};
`;

export const PostInfo = styled.div`
	${layout.col};
`;

export const PostAuthor = styled.div`
	${layout.row};
	${cursor.clickable};
	& span {
		${font.text};
	}
`;

export const PostTitle = styled.div`
	${layout.row};
	${font.title};
	margin-bottom: ${length.margin};
	color: ${color.primary};
`;

export const PostDate = styled.div`
	${layout.row};
	${font.text};
	margin-bottom: ${length.margin};
`;

export const PostContent = styled.div`
	${layout.row};
	min-height: 40vh;
`;

export const PostDescription = styled.div`
	width: 100%;
`;

export const PostComments = styled.div``;
