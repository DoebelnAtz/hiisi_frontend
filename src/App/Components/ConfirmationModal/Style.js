import styled from 'styled-components';
import { color, layout, length } from '../../../Styles/SharedStyles';

export const ModalInside = styled.div`
	position: absolute;
	left: 30%;
	right: 30%;
	top: 30%;
	bottom: 30%;
	max-height: 70vh;
	padding: ${length.margin};
	border: 5px solid ${color.siteBG2};
	border-radius: 2px;
	margin: auto;
	background: ${color.siteBG2};
	overflow: auto;
	z-index: 12;
	${layout.col};
`;

export const ModalOutside = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 13;
`;
