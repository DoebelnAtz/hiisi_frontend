import styled from 'styled-components';
import {
	color,
	colorAdjust,
	cursor,
	font,
	layout,
	length,
} from '../../../../../Styles/SharedStyles';

export const Tags = styled.div`
	margin-top: auto;
	${layout.row};
`;

export const Tag = styled.div`
	z-index: 2;
	${cursor.clickable};
	margin: 2px 4px 2px 0;
	background-color: ${(props) => props.color};
	padding: 4px 8px;
	border-radius: 4px;
	&:hover {
		background-color: ${(props) => colorAdjust.darken(props.color, 0.1)};
	}
`;
