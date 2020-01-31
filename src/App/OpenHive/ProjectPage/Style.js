import styled, { css } from 'styled-components';
import {color, colorAdjust, cursor, length, layout, border, font} from "../../../Styles/sharedStyles";

export const ProjectPage = styled.div`
    color: white;
    width: calc(100%);
    height: 100%;
    border: 1px solid ${color.primary};
    padding: ${length.margin} 0;
    background-color: ${color.siteBG3};
`;

export const ProjectInfo = styled.div`
    ${layout.row};
`;

export const ProjectTitle = styled.div`
    ${layout.centered};
    ${font.title};
`;

export const ProjectCollaborators = styled.div`
   & img {
        height: 32px;
        width: 32px;
        border-radius: 50%;
        margin-left: -8px;
        border: 3px solid ${color.siteBG3};
   }
   
`;

export const ProjectDashboardNav = styled.div`
  ${layout.row};
  ${cursor.clickable};
  ${border.setBorders(1, 0 , 0, 0, color.primary)}
  & div:nth-child(2) {
    ${border.setBorders(0, 1 , 1, 1, color.primary)}
  }
`;

export const ProjectDashBoardNavItem = styled.div`
  ${layout.col};
  border-bottom: 1px solid ${color.primary};
  display: flex; 
  justify-content: center;
`;

export const ProjectDashBoard = styled.div`
  
`;

