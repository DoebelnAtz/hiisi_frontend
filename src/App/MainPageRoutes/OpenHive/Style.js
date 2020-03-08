import styled from 'styled-components';
import { color, components, layout, length } from '../../../Styles/SharedStyles';

export const ProjectList = styled.div`
	color: ${color.primary};
`;

export const ProjectButtonRow = styled.div`
	${layout.row};
	margin: ${length.margin};
`;

export const CreateProjectButton = styled.button`
	${components.button};
	height: 34px;
	margin-right: ${length.margin};
`;
