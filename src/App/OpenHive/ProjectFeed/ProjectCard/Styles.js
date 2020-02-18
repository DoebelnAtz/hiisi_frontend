import styled from 'styled-components';
import { color, cursor, layout, length } from '../../../../Styles/sharedStyles';

export const CollaboratorList = styled.div`
	margin-top: auto;
	${layout.row};
	& img {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		border: 4px solid ${color.siteBG2};
		margin-right: -${length.margin};
	}
`;
