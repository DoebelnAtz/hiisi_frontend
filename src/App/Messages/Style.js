import styled from 'styled-components';
import { color, cursor, length } from '../../Styles/sharedStyles';

export const MessageModal = styled.div`
	color: white;
	background-color: ${color.siteBG2};
	padding: ${length.margin};
	width: 300px;
	height: 40px;
	${cursor.clickable};
	position: fixed;
	bottom: 0;
	right: 0;
`;
