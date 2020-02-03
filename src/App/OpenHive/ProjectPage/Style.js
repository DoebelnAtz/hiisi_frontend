import styled, { css } from 'styled-components';
import {color, colorAdjust, cursor, length, layout, border, font} from "../../../Styles/sharedStyles";

export const ProjectPage = styled.div`
    color: white;
    width: calc(100%);
    height: 100%;
    padding: ${length.margin};
    background-color: ${color.siteBG2};
`;

export const ProjectInfo = styled.div`
    ${layout.row};
`;

export const ProjectTitle = styled.div`
    ${layout.centered};
    ${font.title};
`;

export const ProjectCollaborators = styled.div`
  ${layout.row};
  margin: ${length.margin};
   & img {
        height: 42px;
        width: 42px;
        border-radius: 50%;
        margin-left: -8px;
        border: 4px solid ${color.siteBG2};
   }
   
   
`;

export const Collaborator = styled.div`
  position: relative;
  bottom: 0;
  z-index: auto;
  ${cursor.clickable};
  transition: all 0.1s;
  &:hover {
      bottom: 10px;
      z-index: 4!important;
   }
`;

export const ProjectDashboardNav = styled.div`
  ${layout.row};
  ${cursor.clickable};
  ${border.setBorders(1, 1 , 0, 1, color.primary)}
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

