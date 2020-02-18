import styled from 'styled-components';
import { color, layout, length } from '../Styles/sharedStyles';

export const MainContainer = styled.div`
	max-width: 1900px;
	margin-right: auto;
	margin-left: auto;
	padding-right: ${length.margin};
	padding-left: ${length.margin};
`;

export const MainPageHeader = styled.div`
	width: 100%;
	margin: 0;
	border-radius: ${length.radius};
`;

export const MainPage = styled.div`
	max-width: 1900px;
	${layout.row};
	padding-bottom: ${length.margin};
	width: calc(100%);
	height: calc(100vh - 60px - ${length.margin} * 3);
	margin: 0;
	overflow: auto;
`;

export const SideNavCol = styled.div`
	max-width: 300px;
	height: calc(100vh - 60px - ${length.margin} * 5);
	border-radius: ${length.radius};
	background-color: ${color.siteBG1};
`;

export const MainView = styled.div`
	border-radius: ${length.radius};
	width: calc(100% - 210px - ${length.margin} * 3);
	background-color: ${color.siteBG1};
	margin-left: ${length.margin};
	overflow: auto;
	height: calc(100vh - 60px - ${length.margin} * 4);
	transition: width 0.2s;
	@media (max-width: 1024px) {
		width: calc(100% - 50px - ${length.margin} * 3);
	}
`;
