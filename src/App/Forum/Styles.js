import styled from 'styled-components';
import { components, layout, length } from '../../Styles/sharedStyles';

export const FeedPage = styled.div`
	height: calc(100% - ${length.margin});
	width: 100%;
	padding-bottom: ${length.margin * 2};
`;

export const FeedButtonRow = styled.div`
	${layout.row};
	margin: ${length.margin};
`;

export const CreatePostButton = styled.button`
	${components.button};
	margin-right: ${length.margin};
`;
