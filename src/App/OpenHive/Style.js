import styled from 'styled-components';
import { color, components, layout, length } from '../../Styles/sharedStyles';

export const ProjectList = styled.div`
	color: ${color.primary};
`;

export const ProjectButtonRow = styled.div`
	${layout.row};
	margin: ${length.margin};
`;

export const CreateProjectButton = styled.button`
	${components.button};
	margin-right: ${length.margin};
`;
