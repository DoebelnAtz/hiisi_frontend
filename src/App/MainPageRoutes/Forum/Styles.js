import styled from 'styled-components';
import { components, layout, length } from '../../../Styles/SharedStyles';

export const FeedPage = styled.div`
	height: calc(100% - ${length.margin});
	width: 100%;
	padding-bottom: ${length.margin * 2};
`;

export const CreatePostButton = styled.button`
	${components.button};
	height: 34px;
	line-height: 28px;
	width: ${props => props.width};
	min-width: 120px;
	margin-right: ${length.margin};
`;

export const FeedButtonRow = styled.div`
	${layout.row};
	flex-wrap: nowrap;
	overflow: visible;
	margin: ${length.margin} 3px ${length.margin} ${length.margin};
	& > div:first-of-type {
 		margin-right: 0;
 	}
`;
