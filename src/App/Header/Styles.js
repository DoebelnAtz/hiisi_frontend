import styled from 'styled-components';
import { color, font, layout, length } from '../../Styles/SharedStyles';

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
	width: 250px;
	height: 70px;
	@media (max-width: 1024px) {
		width: 90px;
		${layout.row};
		height: 70px;
	}
`;

export const Logo = styled.img`
	height: 56px;
	margin: auto ${length.margin};
	@media (max-width: 1024px) {
		margin-top: 7px;
	}
`;

export const SiteTitle = styled.span`
	${font.title};
	line-height: 70px;
	color: ${color.primary};
	@media (max-width: 1024px) {
		visibility: hidden;
	}
`;

export const SearchLabel = styled.label`
	margin-left: auto;
	${layout.row};
`;

export const NavTitleDiv = styled.div`
	font-size: 26px;
	margin-top: auto;
	margin-bottom: 20px;
	margin-right: auto;
	color: ${color.primary};
	font-family: 'Share Tech', sans-serif;
	line-height: 26px;
`;

export const LogOutDiv = styled.div`
	font-size: 24px;
	color: ${color.primary};
	font-family: 'Share Tech', sans-serif;
	cursor: pointer;
	line-height: 70px;
	margin-right: ${length.margin};
`;
