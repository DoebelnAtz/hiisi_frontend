import styled from 'styled-components';
import { color, cursor, length } from '../../Styles/sharedStyles';

export const MessageModal = styled.div`
	color: white;
	border: 1px solid ${color.primary};
	background-color: ${color.siteBG2};
	padding: 4px;
	width: 300px;
	height: 40px;
	${cursor.clickable};
	position: fixed;
	bottom: 0;
	z-index: 5;
	right: 0;
`;
