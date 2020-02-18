import styled from 'styled-components'
import { color, layout, length } from '../Styles/sharedStyles';


export const MainContainer = styled.div`
	max-width: 1900px;
    min-width: 568px;
    margin-right: auto;
    margin-left: auto;
    padding-right: ${length.margin};
    padding-left: ${length.margin};
    width: calc(100% - ${length.margin});
    height: calc(100% - calc(60px + ${length.margin} * 2));	
`;

export const MainPageHeader = styled.div`
	width: 100%;
	margin: 0;
	border-radius: ${length.radius};
`;

export const MainPage = styled.div`
	max-width: 1900px;
	${layout.row};
    min-width: 100%;
    padding-bottom: ${length.margin};
    width: calc(100% - ${length.margin} * 1);
    height: calc(100%);
    margin: 0;
    overflow: auto;
`;

export const SideNavCol = styled.div`
	max-width: 300px;
    height: 100%;
    border-radius: ${length.radius};
    background-color: ${color.siteBG1};
`;

export const MainView = styled.div`
    border-radius: ${length.radius};
	width: calc(100% - 230px - ${length.margin} * 3);
    background-color: ${color.siteBG1};
    margin-left: ${length.margin};
    overflow: auto;
    height: 100%;
    transition: width 0.2s;

    @media (max-width: 1024px) {
    	width: calc(100% - 50px - ${length.margin} * 3);
  	}

`;
