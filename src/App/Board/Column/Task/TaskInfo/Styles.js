import styled, { css } from 'styled-components';
import  { color, colorAdjust, length, layout } from "../../../../../Styles/sharedStyles";

export const OuterDiv = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0,0,0, 0.5);
    z-index: 1;
`;

export const TaskDescription = styled.div`
    width: 50%;
    height: 70%;
`;

export const TaskComments = styled.div`
    
`;

export const TaskTitle = styled.div`
    ${layout.row};
    font-size: 26px;
    margin: 0 0 14px 0;
   
`;

export const TaskInfo = styled.div`
    position: absolute;
    padding: ${length.margin};
    left: 20%;
    right: 20%;
    top: 15%;
    bottom: 35%;
    color: ${color.primary};
    border: 5px solid ${color.siteBG2};
    border-radius: 2px;
    margin: auto;
    background: ${color.siteBG2};
    overflow: auto;
    z-index: 2!important;
`;


