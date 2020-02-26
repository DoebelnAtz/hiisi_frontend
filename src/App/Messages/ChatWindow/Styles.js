import styled from 'styled-components';
import { color, colorAdjust, length } from '../../../Styles/SharedStyles';

export const ChatWindowDiv = styled.div`
	position: absolute;
	background-color: ${colorAdjust.rgba(color.siteBG3, 0.95)};
	bottom: 20px;
	right: 0;
	height: auto;
	z-index: 42;
	border-top-left-radius: ${length.radius};
	border: 2px solid ${color.primary};
	border-right-width: 1px;
	width: calc(350px - 1px);
	padding-bottom: 20px;
`;