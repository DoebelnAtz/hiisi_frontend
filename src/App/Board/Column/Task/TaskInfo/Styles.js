import styled, { css } from 'styled-components';
import {color, colorAdjust, length, layout, components, border} from "../../../../../Styles/sharedStyles";

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
    z-index: 1;
`;

export const PriorityInput = components.input;

export const TaskDescription = styled.div`
    ${layout.col};
    height: 100%;
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

export const TaskCollaborators = styled.div`
  ${layout.col};
  height: 100%;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
`;

export const Collaborator = styled.div`
  ${layout.row};
  margin: ${length.margin};
  & img {
      height: 60px;
      width: 60px;
      border-radius: 30px 0 30px 30px;
      border: 4px solid ${color.siteBG4};
  }
`;

export const TaskInfoHead = styled.div`
    ${layout.row};
    height: 50px;
    margin-bottom: ${length.margin};
`;

export const TaskInfoBody = styled.div`
    height: calc(100% - 120px);
    width: calc(100%- 20px);
    ${layout.row};
`;

export const TaskTitle = styled.div`
    ${layout.row};
    font-size: 26px;
    margin: 0 0 0 ${length.margin};
   
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


