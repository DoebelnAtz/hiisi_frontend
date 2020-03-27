import styled from 'styled-components';
import { cursor, layout, length } from '../../../../Styles/SharedStyles';

export const MoreButton = styled.div`
	${layout.row};
	width: calc(100% - 7px);
	margin-bottom: ${length.margin};
	& img {
		${layout.centered};
		${cursor.clickable};
		margin: 0 auto;
		height: 54px;
		width: 54px;
	}
`;
