import styled from 'styled-components';
import { colorAdjust, layout } from '../../../Styles/SharedStyles';

export const LoadingDot = styled.div`
	height: ${props => props.height - 4}px;
	width: ${props => props.height - 4}px;
	transition: background-color 0.2s;
	background-color: ${props => props.active ? colorAdjust.lighten(props.color, 0.2) : props.color};
	margin: auto;
	border-radius: ${props => props.height / 2 -2}px;
`;

export const LoadingDotsDiv = styled.div`
	${layout.row};
	width: fit-content;
	padding: ${props => props.height / 6}px;
	height: ${props => props.height}px;
	margin: auto;
	& ${LoadingDot}:nth-child(2n+2) {
		margin: auto ${props => props.height / 6}px;
	}
`;

