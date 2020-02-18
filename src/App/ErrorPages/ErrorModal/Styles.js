import styled from 'styled-components';
import { layout } from '../../../Styles/sharedStyles';

export const ErrorDiv = styled.div`
	background-color: red;
    width: 100px;
    height: 50px;
    color: wheat;
    top: 0;
    opacity: 90%;
    right: 0;
    
    ${layout.row};
    position: absolute;
    & span {
    	font-size: 20px;
		line-height: 50px;
		margin: 0 auto;
    }
`;
