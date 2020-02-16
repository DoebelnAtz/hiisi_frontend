import styled from 'styled-components';

import { border, color, colorAdjust, components, cursor, layout, length } from '../../../../../Styles/sharedStyles';

export const ParentComment = styled.div`
    margin-left: ${length.margin};
    margin-top: ${length.margin};
    ${border.setBorders(1, 1, 1, 1, color.primary)};
    background-color: ${props => props.odd ? color.siteBG2 : color.siteBG3};
    border-top-left-radius: 28px;
    position: relative;
    top: 1px;
    left: 1px;
    border-bottom-left-radius: 10px;
    
    & img {
        border: 3px solid ${color.primary};
        position: relative;
        bottom: 1px;
        right: 1px;
        border-radius: 50% 0 50% 50%;
        width: 52px;
        height: 52px;
  }
`;

export const ButtonRow = styled.div`
    margin: 0 ${length.margin};
    ${layout.row};
`;

export const ShowRepliesButton = styled.button`
	${components.button};
	width: 100px;
	margin-right: ${length.margin};
`;

export const CommentInfo = styled.div`
    position: relative;
    right: 1px;
    bottom: 1px;
    height: 28px;
    padding-left: ${length.margin};
    ${border.setBorders(1, 1, 1, 0, color.primary)};
    border-radius: 0 15px 15px 0;
    width: auto;
    padding-right: ${length.margin};
`;

export const CommentHead = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CommentBody = styled.div`
    margin: ${length.margin} calc(${length.margin} * 2) 0;
    padding-bottom: ${length.margin};
`;

export const ReplyRow = styled.div`
	width: calc(100% - ${props => props.full ? '110px' : '0px'});
`;


export const ChildComments = styled.div`
  margin: ${length.margin} 0 0 0;
`;
