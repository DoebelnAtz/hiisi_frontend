import styled from 'styled-components';
import { color, layout, length } from '../../../../../Styles/SharedStyles';

export const CollaboratorList = styled.div`
	margin-top: auto;
	${layout.row};
	& img {
		height: 40px;
		width: 40px;
		z-index: 1;
		border-radius: 50%;
		border: 4px solid ${color.siteBG2};
		margin-right: -${length.margin};
	}
`;
