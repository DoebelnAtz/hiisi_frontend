import styled, { css } from 'styled-components';
import {color, colorAdjust, cursor, length} from "../../Styles/sharedStyles";

export const ProjectList = styled.div`
  color: ${color.primary};
`;

export const ProjectItem = styled.div`
  padding: ${length.margin};
    margin: ${length.margin};
    border: 1px solid ${color.primary};
    background-color: ${color.siteBG1};
    border-radius: ${length.radius};
`;

export const CollaboratorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  & img {
    height: 24px;
    border-radius: 50%;
    margin-right: ${length.margin};
  }
  
`;
