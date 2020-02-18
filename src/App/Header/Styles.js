import styled from 'styled-components';
import { color, font, layout, length } from '../../Styles/sharedStyles';

export const HeaderDiv = styled.div`
	height: 70px;
	width: 100%;
	${layout.row};
	border-radius: ${length.radius};
	background-color: ${color.siteBG1};
	margin: ${length.margin} 0;
`;

export const LogoDiv = styled.div`
	${layout.row};
	width: 300px;
	height: 100%;
`;

export const Logo = styled.img`
	height: 56px;
	margin: auto ${length.margin};
`;

export const SiteTitle = styled.span`
	${font.title};
	line-height: 70px;
	color: ${color.primary};
`;

export const NavTitleDiv = styled.div`
	font-size: 24px;
	color: ${color.primary};
	font-family: 'Share Tech', sans-serif;
	line-height: 70px;
`;

export const LogOutDiv = styled.div`
	font-size: 24px;
	color: ${color.primary};
	font-family: 'Share Tech', sans-serif;
	cursor: pointer;
	line-height: 70px;
	margin-right: ${length.margin};
`;
