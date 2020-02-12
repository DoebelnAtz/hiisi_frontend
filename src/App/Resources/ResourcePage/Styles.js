import styled from 'styled-components';
import {color, components, cursor, font, layout, length} from "../../../Styles/sharedStyles";
import { animated } from 'react-spring';


export const OutsideDiv = styled(animated.div)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 2;
`;

export const ModalDiv = styled(animated.div)`
	position: absolute;
	left: 15%;
	right: 15%;
	top: 15%;
	min-height: 50%;
	height: auto;
	max-height: 80%;

	overflow-y: auto;
	color: ${color.primary};
	border: 5px solid ${color.siteBG2};
	border-radius: 2px;
	margin: auto;
	background: ${color.siteBG2};
	z-index: 3 !important;
	display: flex;
	flex-direction: column;
`;

export const ResourcePage = styled.div`
  width: 100%;
  min-height: 100%;
  height: 100%;
`;

export const ResourceHeader = styled.div`
  ${layout.col};
`;

export const ResourceTitle = styled.div`
	${layout.row};
	  ${font.title};
	  padding-right: 50px;
	  font-size: 28px;
	  margin: 0 0 0 ${length.margin};
	  color: ${color.primary};
	  & :hover {
		text-decoration: none;
	  }
`;

export const SaveButton = styled.button`
	position: absolute;
	right: 0;
	margin: ${length.margin} ${length.margin} ${length.margin} auto;
	${components.button};
`;

export const ResourceTags = styled.div`
  ${layout.row};
  margin: ${length.margin} ${length.margin} 0 ${length.margin};
`;

export const ResourceContent = styled.div`
  width: calc(100% - ${length.margin} * 2);
  min-height: 50%;
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
  min-height: 50%;
  height: 400px;
  background-color: ${color.siteBG3};
  width: calc(${props => props.full  ? '100%' : '60%'});
`;

export const ResourceComments = styled.div`
    border-top: ${length.margin} solid ${color.siteBG1};
    margin: ${length.margin};
    width: calc(100% - ${length.margin} * 2);
`;
