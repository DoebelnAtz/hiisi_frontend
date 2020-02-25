import styled from 'styled-components';
import { color, colorAdjust, components, cursor, font, layout, length } from '../../../../../Styles/sharedStyles';

export const ProjectCollaborators = styled.div`
	${layout.row};
	margin: ${length.margin};
	margin-left: auto;
	z-index: 0;
	& img {
		height: 42px;
		width: 42px;
		border-radius: 50%;
		margin-left: -8px;
		border: 4px solid ${color.siteBG1};
	}
`;

export const Collaborator = styled.div`


	&:hover {
		${cursor.clickable};

	}
`;

export const OptionRow = styled.div`
	${layout.row};

	border-bottom: 2px solid ${color.siteBG2};
	padding: ${length.margin};
	height: 34px;
	& label {
		line-height: 34px;
		${layout.row};
		width: 100%;
	}
	& input {
		${components.input};
		border-color: ${color.siteBG1};
	  	margin-left: auto;
	  	height: 30px;
	  	width: 30vw;
	  	${font.text};
	  	min-width: fit-content;
	  	max-width: 400px;
	  	padding-right: 5px;
	}
`;
