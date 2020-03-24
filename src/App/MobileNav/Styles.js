import styled from 'styled-components';
import { color, layout, length, colorAdjust} from '../../Styles/SharedStyles';

export const MobileNavContainer = styled.div`
	width: calc(100vw);
	min-height: 60px;
	z-index: 42;
	display: flex;
	padding: 0 10px;
	background-color: ${color.siteBG3};
`;

export const NavIconContainer = styled.div`
	background-color: ${color.siteBG3};
	display: flex;
	width: calc(100% - 20px);
`;

export const MobileNavItem = styled.div`
	
	margin: auto 5px 0 5px;
	padding-bottom: ${props => props.selected ? `7px` : '10px'};
	display: flex;
	${props => props.selected ? `border-bottom: 3px solid ${color.primary}` : ''};
	width: calc(calc(100% - 20px) / 6 - 10px);
	& img {
		border-radius: 50% 50% 0 50%;
		height: 36px;
		margin: 0 auto;
		background-color: ${props => props.selected ? color.siteBG4 : color.siteBG2};
	}
	& img:hover{
		background-color: ${color.siteBG4};
	}
`;

export const HeaderDiv = styled.div`
	display: flex;
	width: 100%;
	margin: 5px 0;
	height: 36px;
`;
export const Logo = styled.img`
	height: 32px;
	margin: auto auto auto 10px;
`;
