import styled, { css } from 'styled-components';
import {colorAdjust, color, length, layout} from "../../../../Styles/sharedStyles";

export const TextEditOutput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: calc(${length.margin});
  border: none;
  color: ${color.primary};
  border-radius: ${length.radius};
  background-color: ${color.siteBG3};
  transition: border-width 0.5s, padding 0.5s;

  :focus {
      border: 3px solid ${color.primary};
      box-shadow: none;
      padding: calc(${length.margin} - 3px);
      width: 100%;
      height: 100%;
      outline: none;
  }
`;

export const TextOutput = styled.div`
     width: 100%;
     height: 100%;
     padding: ${length.margin};
     border-radius: ${length.radius};
     background-color: ${color.siteBG3};
`;
