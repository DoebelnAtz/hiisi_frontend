import styled from 'styled-components';
import { color, length, layout } from '../../Styles/SharedStyles';

export const MobileNavContainer = styled.div`
	width: calc(100vw);
	min-height: 60px;
	z-index: 42;
	${layout.row};
	background-color: ${color.siteBG3};
`;

export const MobileNavItem = styled.div`
	
	margin: auto 5px 0 5px;
	padding-bottom: ${props => props.selected ? `8px` : '10px'};
	display: flex;
	${props => props.selected ? `border-bottom: 2px solid ${color.primary}` : ''};

	width: calc(20% - 10px);
	& img {
		border-radius: 50% 50% 0 50%;
		height: 40px;
		margin: 0 auto;
		background-color: ${props => props.selected ? color.siteBG4 : color.siteBG2};
	}
	& img:hover{
		background-color: ${color.siteBG4};
	}
`;
