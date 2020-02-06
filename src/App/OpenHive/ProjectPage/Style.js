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
  z-index: 5;
  justify-content: center;
  &:hover {
    background-color: ${color.siteBG3};
  }
`;

export const ProjectDashBoard = styled.div`
  
`;

