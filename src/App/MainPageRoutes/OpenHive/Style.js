import styled from 'styled-components';
import { color, components, layout, length } from '../../../Styles/SharedStyles';

export const ProjectList = styled.div`
	color: ${color.primary};
`;

export const ProjectButtonRow = styled.div`
	${layout.row};
	flex-wrap: nowrap;
	overflow: visible;
	margin: ${length.margin};
`;

export const CreateProjectButton = styled.button`
	${components.button};
	height: 34px;
	line-height: 28px;
	min-width: 140px;
	margin-right: ${length.margin};
`;
