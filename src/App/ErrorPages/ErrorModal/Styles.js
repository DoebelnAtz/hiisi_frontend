import styled from 'styled-components';
import { color, layout, length } from '../../../Styles/SharedStyles';

export const ErrorDiv = styled.div`
	background-color: ${color.siteBG5};
    height: 50px;
    color: wheat;
    top: 0;
    padding: 0 ${length.margin};
    opacity: 97%;
    right: 0;
    z-index: 142;
    border-radius: 0 0 0 4px;
    ${layout.row};
    position: absolute;
    & img {
      height: 40px;
      width: 40px;
      margin: auto ${length.margin} auto 0;
      border-radius: 20px;
    }
    & span {
    	font-size: 20px;
		line-height: 50px;
		margin: 0 auto;
    }
`;
