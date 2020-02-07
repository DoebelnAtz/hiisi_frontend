import styled from 'styled-components';
import {color, colorAdjust, components, cursor, font, layout, length} from "../../Styles/sharedStyles";

export const Resources = styled.div`
  
`;

export const ResourceCard = styled.div`
  ${font.text};
  width: calc(100% - ${length.margin} * 2);
  border-radius: 8px;
  padding: 14px;
  z-index: 1;
  background-color: ${color.siteBG2};
  margin: ${length.margin};
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
  ${cursor.clickable};
  margin: 6px 4px 6px 0;
  background-color: ${props => props.color};
  padding: 4px 8px;
  border-radius: 4px;
  &:hover {
    background-color: ${props => colorAdjust.darken(props.color, 0.1)};
  }
`;


export const SubmitResourceButton = styled.div`
  ${components.button};
  width: fit-content;
  font-size: 18px;
  margin: ${length.margin};
`;

export const FilterButton = styled.div`
  ${components.button};
  width: fit-content;
  font-size: 18px;
  margin: ${length.margin};
`;

export const ResourcePageHead = styled.div`
  ${layout.row};
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
