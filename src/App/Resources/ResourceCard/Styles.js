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
	width: 41px;
	padding: 14px 0;
	border-right: 1px solid ${color.siteBG1};
   	${layout.col};
`;

export const ResourceContent = styled.div`
	width: calc(100% - 94px);
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
	display: flex;
	flex-direction: column;
	border-left: 1px solid ${color.siteBG1};
`;

export const ResourceDate = styled.span`
	margin-left: auto;
	font-size: 14px;
	padding-left: 10px;
	${layout.row};

`;

export const ResourceInfo = styled.div`
   ${layout.row};
   font-size: 20px;
   width: auto;
   margin-bottom: ${length.margin};
`;

export const ResourceTitle = styled.span`
	${layout.col};
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

export const ArrowImage = styled.div`
	${layout.row};
	& img {
	height: 30px;
	width: 30px;
	margin: 0 auto;
	${cursor.clickable};
	}

`;

export const ResourceVoteCount = styled.div`
  ${layout.row};
  & span {
  	user-select: none;
  	text-align: center;
  	letter-spacing: 0;
	margin: 0 auto;
  }

`;


export const DeleteButton = styled.div`
  ${layout.row};
  margin-bottom: 10px;
  & img {
  	${cursor.clickable};
  	margin: 0 auto;
  	height: 30px;
  	border-radius: 50%;
	  background-color: ${color.siteBG2};
	  transition: background-color 0.2s;
  	&:hover {
  		background-color: ${color.siteBG1};
  	}
  }
  
  
`;

export const ShareButton = styled.div`
  ${layout.row};
  
  & img {
  	${cursor.clickable};
  	margin: 0 auto;
  	height: 30px;
	border-radius: 50%;
	background-color: ${color.siteBG2};
  	transition: background-color 0.2s;
	&:hover {
		background-color: ${color.siteBG1};
	}
  }
`;

export const CopiedSpan = styled.span`
	position: relative;
	bottom: 0;
	transition: opacity 0.3s;
	user-select: none;
	opacity: ${props => props.copied ? '1' : '0'};
`;
