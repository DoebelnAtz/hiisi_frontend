import styled from 'styled-components';
import {
	color,
	colorAdjust,
	components,
	cursor,
	font,
	layout,
	length,
} from '../../../Styles/SharedStyles';

export const Resources = styled.div``;

export const SubmitResourceButton = styled.button`
	${components.button};
	width: fit-content;
	margin-right: ${length.margin};
`;

export const FilterButton = styled.button`
	${components.button};
	width: fit-content;
	margin-left: auto;
	@media (max-width: 768px) {
		margin-left: 0;
	}
`;

export const ResourcePageHead = styled.div`
	${layout.row};
	margin: ${length.margin};
	display: flex;
	flex-wrap: wrap;
`;
