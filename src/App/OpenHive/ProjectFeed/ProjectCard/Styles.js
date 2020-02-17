import styled from 'styled-components';
import { color, cursor, layout, length } from '../../../../Styles/sharedStyles';

export const CollaboratorList = styled.div`
	margin-top: auto;
	${layout.row};
	& img {
		height: 24px;
		border-radius: 50%;
		margin-right: ${length.margin};
	}
`;
