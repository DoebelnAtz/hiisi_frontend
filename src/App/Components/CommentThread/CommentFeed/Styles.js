import styled from 'styled-components';

import { components, cursor, length } from '../../../../Styles/SharedStyles';

export const MoreButton = styled.img`
	${cursor.clickable};
	height: 40px;
	width: 40px;
	margin: ${length.margin} auto;
`;
