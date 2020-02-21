import styled from 'styled-components';
import { layout, length, modal, font, color } from '../../../../Styles/sharedStyles';

export const OutsideDiv = styled.div`
	${modal.outside};
`;

export const InsideDiv = styled.div`
	${modal.inside};
	top: 10%;
	padding: ${length.margin};
	max-height: 80%;
	bottom: 25%;
`;

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
	margin-left: auto;
`;

export const PostContent = styled.div`
	${layout.row};
	height: 50%;
`;

export const PostComments = styled.div``;
