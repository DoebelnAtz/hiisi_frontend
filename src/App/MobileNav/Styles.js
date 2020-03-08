import styled from 'styled-components';
import { color, length, layout } from '../../Styles/SharedStyles';

export const MobileNavContainer = styled.div`
	width: calc(100vw);
	min-height: 60px;
	z-index: 42;
	${layout.row};
	margin-bottom: ${length.margin};
	background-color: ${color.siteBG3};
`;

export const MobileNavItem = styled.img`
	height: 40px;
	margin: auto;
	border-radius: 50% 50% 0 50%;
	background-color: ${props => props.selected ? color.siteBG4 : color.siteBG2};
	&:hover{
		background-color: ${color.siteBG4};
	}
`;
