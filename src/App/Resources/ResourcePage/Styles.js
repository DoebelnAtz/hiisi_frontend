import styled from 'styled-components';
import {color, font, layout, length} from "../../../Styles/sharedStyles";

export const ResourcePage = styled.div`
  width: 100%;
  height: calc(100% - ${length.margin});
`;

export const ResourceHeader = styled.div`
  ${layout.row};
`;

export const ResourceTitle = styled.div`
  ${font.title};
  margin: 0 0 0 ${length.margin};
  color: ${color.primary};
  & :hover {
    text-decoration: none;
  }
`;


export const ResourceDescription = styled.div`
  ${font.text};
  margin: ${length.margin};
  background-color: ${color.siteBG3};
  width: calc(100% - ${length.margin} * 2);
  height: 50%;
`;

export const ResourceComments = styled.div`
    margin: ${length.margin};
    width: calc(100% - ${length.margin} * 2);
`;
