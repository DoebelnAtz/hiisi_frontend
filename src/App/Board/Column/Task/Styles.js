import styled, { css } from 'styled-components';
import {color, colorAdjust, cursor, layout, length} from "../../../../Styles/sharedStyles";

export const TaskContent = styled.div`
  display: block;
  margin-top: 0;
`;

export const TaskStatus = styled.div`
  margin-top: ${length.margin};
  ${layout.row}
  & img {
    height: 28px;
    width: 28px;
  }
`;

export const TaskCollaborators = styled.div`
  ${layout.row};
  margin-left: auto;
  & img {
      transition: border 0.3s;
      height: 32px;
      width: 32px;
      margin-left: -8px;
      border-radius: 50%;
      border: 3px solid ${color.siteBG4};
  }
`;

export const Task = styled.div`
  padding: 10px;
  margin: 0 0;
  border: 4px solid ${color.siteBG2};
  color: white;
  border-radius: 8px;
  transition: all 0.3s;
  ${cursor.clickable};
  background-color: ${color.siteBG4};
  
  & span {
    font-size: 16px;
  }
  
  &:hover {
    background-color: ${colorAdjust.lighten(color.siteBG3, 0)};
  }
  &:hover  ${TaskCollaborators} img {
    border: 3px solid ${color.siteBG3};
  }
  
  ${props =>
    props.isBeingDragged &&
    css`
      border: 2px solid ${color.siteBG3};
      background-color: ${colorAdjust.lighten(color.siteBG2, 0.5)};;
      transform: scale(1.2);
    `}
`;


