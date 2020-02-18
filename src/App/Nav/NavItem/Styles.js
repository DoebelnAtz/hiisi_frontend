import styled from 'styled-components';
import { color, colorAdjust, cursor, font, layout, length } from '../../../Styles/sharedStyles';

export const NavItemDiv = styled.div`
    height: 50px;
    width: 230px;
    margin: ${length.margin};
    ${layout.row};
    border-radius: 25px ${length.radius} ${length.radius} 25px;
    background-color: ${props => props.selected ? color.siteBG3 : color.siteBG2};
    ${cursor.clickable};
  	transition: all 0.2s;
  
    &:hover {
    	    background-color: ${color.siteBG3};

    }
    @media (max-width: 1024px) {
    	width: 50px;
		border-top-right-radius: 25px;
  	}
`;

export const NavTitle = styled.span`
	${font.title};
	visibility: visible;
	font-size: 30px;
	line-height: 50px;
	color: ${color.primary};
	@media (max-width: 1024px) {
		visibility: hidden;
  	}
`;

export const NavIcon = styled.img`
	height: 50px;
	width: 50px;
	margin-right: ${length.margin};
`;
