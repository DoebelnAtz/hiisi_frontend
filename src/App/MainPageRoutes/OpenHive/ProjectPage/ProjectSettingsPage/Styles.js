import styled from 'styled-components';
import { color, colorAdjust, cursor, layout, length } from '../../../../../Styles/sharedStyles';

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
	& span {
	  margin-left: auto;
	}
`;
