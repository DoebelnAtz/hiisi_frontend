import styled from 'styled-components';
import { color, colorAdjust, cursor, font, layout, length } from '../../../Styles/sharedStyles';

export const NavItemDiv = styled.div`
    height: 50px;
    width: 260px;
    margin: ${length.margin};
    ${layout.row};
    border-radius: 25px ${length.radius} ${length.radius} 25px;
    background-color: ${props => props.selected ? color.siteBG3 : color.siteBG2};
    ${cursor.clickable};
    &:hover {
    	    background-color: ${color.siteBG3};

    }
`;

export const NavTitle = styled.span`
	${font.title};
	color: ${color.primary};
`;

export const NavIcon = styled.img`
	height: 50px;
	width: 50px;
	margin-right: ${length.margin};
`;
