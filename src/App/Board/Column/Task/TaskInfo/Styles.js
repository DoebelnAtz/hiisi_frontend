import styled, { css } from 'styled-components';
import {color, colorAdjust, length, layout, components, border, font, cursor} from "../../../../../Styles/sharedStyles";

export const OuterDiv = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0,0,0, 0.5);
    z-index: 5;
`;

export const TaskInfo = styled.div`
    position: absolute;
    padding: ${length.margin};
    ${layout.col};
    left: 20%;
    right: 20%;
    top: 15%;
    bottom: 35%;
    color: ${color.primary};
    border: 5px solid ${color.siteBG2};
    border-radius: 2px;
    margin: auto;
    background: ${color.siteBG2};
    overflow: auto;
    z-index: 2!important;
`;

export const TaskInfoHead = styled.div`
    ${layout.row};
    height: 50px;
    margin-bottom: ${length.margin};
`;

export const TaskInfoBody = styled.div`
    height: calc(100% - 120px);
    width: calc(100%);
    ${layout.row};
`;

export const TaskTitle = styled.div`
    ${layout.row};
    font-size: 26px;
    margin: 0 0 0 ${length.margin};
   
`;

export const TaskFooter = styled.div`
    ${layout.row};
    margin-top: auto;
    height: 50px;
    & input {
      margin-top: auto;
      margin-bottom: auto;
    }
`;

export const PriorityInput = styled.input`
 ${components.input};
`;

export const AddUserInput = styled.input`
 ${components.input};
`;



export const TaskDescription = styled.div`
    height: 100%;
    width: 70%;
`;

export const TaskSidebar = styled.div`
    height: 100%;
    width: 30%;
`;

export const AddUserToTask = styled.div`
  ${layout.row};
  padding: ${length.margin};
  padding-right: 0;
`;

export const TaskCollaborators = styled.div`
  margin-left: calc(${length.margin} * 2 - 4px);
  ${layout.row}
`;

export const Collaborator = styled.img`
  width: 25%;
  max-width: 60px;
  margin-left: -10px;
  border-radius: 50%;
  border: 4px solid ${color.siteBG2};
`;

export const AddUserBtn = styled.div`
  background-color: ${color.primary};
  width: 40px; 
  padding: 0 8px 4px 8px;
  border-radius: 0  18px 18px 0;
  font-size: 24px;
  color: ${color.siteBG2};
  
`;

export const AddUser = styled.div`
  ${layout.row};
  ${cursor.clickable};

  & img {
      height: 40px;
      width: 40px;
      margin-left: 8px;
      border-radius: 50% 0 0 50%;
      border: 2px solid ${color.primary};
  }
  & span {
    font-size: 18px;
    width: calc(100% - 40px - 48px);
    padding: 4px 12px 4px 12px;
    ${border.setBorders(2, 2, 2, 0, color.primary)};
    letter-spacing: 1px;
    color: ${color.primary};
  }
  &:hover span {
      border-color: ${colorAdjust.darken(color.primary, 0.1)}!important;
  }
  
  &:hover img {
      border-color: ${colorAdjust.darken(color.primary, 0.1)}!important;
  }
  
  &:hover ${AddUserBtn} {
      background-color: ${colorAdjust.darken(color.primary, 0.1)}!important;
  }
`;






