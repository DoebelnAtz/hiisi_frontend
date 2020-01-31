import styled, { css } from 'styled-components';
import {color, colorAdjust, cursor, layout, length} from "../../../../Styles/sharedStyles";

export const TaskContent = styled.div`
  display: block;
  margin-top: 0;
`;

export const TaskStatus = styled.div`
  ${layout.row}
  & img {
    height: 26px;
    width: 26px;
  }
`;

export const TaskCollaborators = styled.div`
  ${layout.row};
  margin-left: auto;
  & img {
      height: 30px;
      width: 30px;
      margin-left: -8px;
      border-radius: 50%;
      border: 3px solid ${color.siteBG2};
  }
`;

export const Task = styled.div`
  padding: 10px;
  margin: 0 0;
  border: 2px solid ${color.siteBG3};
  color: white;
  border-radius: ${length.radius};
  transition: all 0.3s;
  ${cursor.clickable};
  background-color: ${color.siteBG2};
  
  
  
  & span {
    font-size: 16px;
  }
  
  &:hover {
    
    background-color: ${colorAdjust.lighten(color.siteBG2, 0)};
  }
  ${props =>
    props.isBeingDragged &&
    css`
      border: 2px solid ${color.siteBG2};

      background-color: ${colorAdjust.lighten(color.siteBG1, 0.3)};;
      transform: scale(1.2);
    `}
`;


