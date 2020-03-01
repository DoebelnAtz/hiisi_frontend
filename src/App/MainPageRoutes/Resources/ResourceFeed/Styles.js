import styled from 'styled-components';
import { cursor, layout, length } from '../../../../Styles/SharedStyles';

export const MoreButton = styled.div`
	${layout.row};
	margin-bottom: ${length.margin};
	& img {
		${layout.centered};
		${cursor.clickable};
		height: 54px;
		width: 54px;
	}
`;
