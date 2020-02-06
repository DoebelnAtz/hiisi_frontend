import styled from 'styled-components';
import {color, colorAdjust, cursor, layout, length} from "../../Styles/sharedStyles";

export const Columns = styled.div`
  display: flex;
  z-index: 3;
`;

export const ProjectCollaborators = styled.div`
  ${layout.row};
  margin: ${length.margin};
  margin-bottom: -10px;
  z-index: 0;
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
  padding-bottom: 10px;
  transition: all 0.1s;
  bottom: ${props => props.filtered ? '10px' : '0'};
  z-index: ${props => props.filtered ? '2' : '1'};
  
  & img {
   border-color: ${props => props.filtered ? colorAdjust.darken(color.primary, 0.7) : color.siteBG2};
  }
  &:hover {
      bottom: 10px;
      ${cursor.clickable};
      z-index: 2!important;
   }
`;