import styled from 'styled-components';
import { layout, font, color, length } from '../../../../Styles/SharedStyles';

export const PostHead = styled.div`
	${layout.row};
`;

export const PostTitle = styled.div`
	${layout.row};
	${font.title};
	color: ${color.primary};
`;

export const PostDate = styled.div`
	${layout.row};
	${font.text};
	margin-right: auto;
	margin-left: ${length.margin};
`;

export const PostContent = styled.div`
	${layout.row};
	min-height: 40vh;
`;

export const PostDescription = styled.div`
	width: 100%;
`;

export const PostComments = styled.div``;
