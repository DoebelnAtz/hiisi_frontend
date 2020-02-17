import styled, { css } from 'styled-components';
import {
	color,
	colorAdjust,
	components,
	cursor,
	length,
} from '../../Styles/sharedStyles';

export const ProjectList = styled.div`
	color: ${color.primary};
`;

export const CreateProjectButton = styled.button`
	${components.button};
	margin: ${length.margin};
`;
