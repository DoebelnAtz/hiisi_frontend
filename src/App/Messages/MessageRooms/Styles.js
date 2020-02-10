import styled from 'styled-components';

import { color, colorAdjust, layout, length } from '../../../Styles/sharedStyles';

export const RoomList = styled.div`
	position: absolute;
	background-color: ${colorAdjust.rgba(color.siteBG3, 0.95)};
	bottom: 40px;
	right: 0;
	height: auto;
	width: 300px;
	padding: ${length.margin};
`;

export const CreateThreadRow = styled.div`
	  width: 90%;
	  margin: 0 auto;
	  ${layout.row};  
`;

export const ThreadItem = styled.div`
  	width: 90%;
  	${layout.row};
  	margin: ${length.margin} auto;

  	& span {
  		color: ${color.primary};
  	}  
`;