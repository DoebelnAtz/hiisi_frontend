import styled from 'styled-components';
import { color, colorAdjust, cursor, font, layout, length } from '../../../Styles/sharedStyles';

export const ResourceCard = styled.div`
  ${font.text};
  ${layout.row};
  width: calc(100% - ${length.margin} * 2);
  border-radius: 8px;
  z-index: 1;
  background-color: ${color.siteBG2};
  margin: ${length.margin};
`;

export const ResourceVotes = styled.div`
	width: 40px;
	padding: 14px 0 14px 4px;
	border-right: 1px solid ${color.siteBG1};
   	${layout.col};
`;

export const ResourceContent = styled.div`
	width: calc(100% - 95px);
	padding: 14px;
	display: flex;
	flex-direction: column;
 	${cursor.clickable};
 	z-index: 1;
 	&:hover {
 		background-color: ${color.siteBG1};
 	}
`;

export const ResourceButtons = styled.div`
	width: 55px;
	padding: 14px 0 ;
	border-left: 1px solid ${color.siteBG1};
`;

export const ResourceTitle = styled.div`
   ${layout.row};
   width: auto;
   margin-bottom: ${length.margin};
`;

export const Tags = styled.div`
	margin-top: auto;
   ${layout.row};
`;

export const Tag = styled.div`
  z-index: 2;
  ${cursor.clickable};
  margin: 2px 4px 2px 0;
  background-color: ${props => props.color};
  padding: 4px 8px;
  border-radius: 4px;
  &:hover {
    background-color: ${props => colorAdjust.darken(props.color, 0.1)};
  }
`;

export const ArrowImage = styled.img`
	height: 30px;
	width: 30px;
	${cursor.clickable};

`;

export const ResourceVoteCount = styled.div`
  ${layout.row};
  margin: 0 10px;  
`;


export const DeleteButton = styled.div`
  position: absolute;
  right: 38px;
  & button {
  width: 28px;
  }
`;