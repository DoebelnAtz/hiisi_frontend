import styled from 'styled-components';
import {color, components, cursor, font, layout, length} from "../../Styles/sharedStyles";

export const Resources = styled.div`
  
`;

export const ResourceCard = styled.div`
  ${font.text};
  width: 100%;
  padding: 14px;
  z-index: 1;
  background-color: ${color.siteBG2};
  margin: ${length.margin} 0;
`;

export const ResourceTitle = styled.div`
   ${layout.row};
   width: auto;
   margin-bottom: ${length.margin};
   ${cursor.clickable}
   &:hover {
    color: ${color.primary};
   }
`;

export const Tags = styled.div`
   ${layout.row};
   
`;

export const Tag = styled.div`
  z-index: 2;
  margin: 6px 4px 6px 0;
  background-color: ${props => props.color};
  padding: 4px 8px;
  border-radius: 4px;
`;





export const DeleteButton = styled.div`
  position: relative;
  & button {
    position: absolute;
    z-index: 3;
    left: calc(100% - 30px);
    bottom: 100%;
  }
`;
