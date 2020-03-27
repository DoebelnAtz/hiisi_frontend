import styled from 'styled-components';
import { color, components, layout, length } from '../../../Styles/SharedStyles';

export const ProjectList = styled.div`
	color: ${color.primary};
`;

export const ProjectButtonRow = styled.div`
	${layout.row};
	flex-wrap: nowrap;
	overflow: visible;
	& > div:first-of-type {
 		margin-right: 0;
 	}
`;

export const CreateProjectButton = styled.button`
	${components.button};
	height: 34px;
	line-height: 28px;
	min-width: 125px;
	width: ${props => props.width};
	margin-right: ${length.margin};
`;
