import styled from 'styled-components';
import {color, components, cursor, font, layout, length} from "../../../Styles/sharedStyles";

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

export const ResourceTags = styled.div`
  ${layout.row};
  margin: ${length.margin} ${length.margin} 0 ${length.margin};
`;

export const ResourceContent = styled.div`
  width: calc(100% - ${length.margin} * 2);
  height: 50%;
  margin: ${length.margin};
  ${layout.row};
`;

export const AddTagInput = styled.input`
  ${components.input};
  width: 100%;
  margin-left: ${length.margin};
`;

export const ResourceTag = styled.div`
    z-index: 2;
    margin: 0 8px 0 0;
    background-color: ${props => props.color};
    ${font.text};
    height: 34px;
    padding: 4px 8px;
    border-radius: 4px;
`;

export const SearchResultTag = styled.div`
    z-index: 2;
    margin: 10px;
    ${layout.row};
    background-color: ${props => props.color};
    ${font.text};
    height: 34px;
    padding: 4px 8px;
    width: 100%;
    border-radius: 4px;
    & span {
    ${cursor.clickable}
      &:hover {
        color: lightgray;
      }
    }
`;

export const TagSearchResults = styled.div`
    width: calc(40% - ${length.margin});
`;

export const ResourceDescription = styled.div`
  ${font.text};
  
  background-color: ${color.siteBG3};
  width: calc(${props => props.full  ? '100%' : '60%'});
`;

export const ResourceComments = styled.div`
    border-top: ${length.margin} solid ${color.siteBG1};
    margin: ${length.margin};
    width: calc(100% - ${length.margin} * 2);
`;
