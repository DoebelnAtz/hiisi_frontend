import styled from 'styled-components';
import { cursor, layout, length } from '../../../../Styles/SharedStyles';

export const MoreButton = styled.div`
	${layout.row};
	width: 100%;
	margin-bottom: ${length.margin};
	& img {
		${cursor.clickable};
		margin: 0 auto;
		height: 54px;
		width: 54px;
	}
`;
