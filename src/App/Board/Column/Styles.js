
import styled from 'styled-components';

import { color, colorAdjust } from "../../../Styles/sharedStyles";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  padding: 0 5px 5px 5px;
  height: 100%;
  width: 20%;
  border-radius: 3px;
  background: ${color.siteBG3};
  
  
`;

export const ColumnList = styled.div`
  height: 100%;
  padding: 2px;
  border-radius: 4px;
  min-height: 20px;
  width: 100%;
  background-color: ${color.siteBG2};
`;

export const ColumnTitle = styled.input`
  padding: 8px 10px 10px;
  margin: 5px 0 0;
  text-transform: uppercase;
  border: none;
  color: ${color.primary};
  background: ${color.siteBG3};

  z-index: 3;
    &:hover {
      background: ${color.siteBG3};
    }
    &:focus {
    	outline: none;
    	background-color: ${color.siteBG1};
    	border-radius: 4px;
    }
`;
