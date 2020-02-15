import styled from 'styled-components';
import { color, layout, length } from '../../Styles/sharedStyles';

export const HeaderDiv = styled.div`
	height: 70px;
	width: 100%;
	${layout.row};
	border-radius: ${length.radius};
	background-color: ${color.siteBG1};
	margin: ${length.margin} 0;
`;

export const LogoDiv = styled.div`
	margin-top: 9px;
	width: 300px;
`;

export const NavTitleDiv = styled.div`
	font-size: 24px;
	color: ${color.primary};
	font-family: 'Share Tech', sans-serif;
	margin-top: 22px;
	margin-left: calc(${length.margin} * 2);
`;

export const LogOutDiv = styled.div`
	font-size: 24px;
	color: ${color.primary};
	font-family: 'Share Tech', sans-serif;
	cursor: pointer;
	margin-top: 22px;
	margin-left: auto;
	margin-right: ${length.margin};
`;
