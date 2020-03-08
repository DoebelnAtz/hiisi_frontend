import styled from 'styled-components';
import { color, length, layout } from '../../Styles/SharedStyles';

export const MobileNavContainer = styled.div`
	width: calc(100vw - ${length.margin} * 2);
	position: absolute;
	bottom: 0;
	height: 7vh;
	z-index: 42;
	${layout.row};
	padding: 0 ${length.margin};
	background-color: ${color.siteBG3};
`;

export const MobileNavItem = styled.img`
	height: 5vh;
	margin: auto;
	border-radius: 50% 50% 0 50%;
	&:hover{
		background-color: ${color.siteBG4};
	}
`;
