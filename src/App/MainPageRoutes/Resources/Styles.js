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
	height: 34px;
	line-height: 28px;
	margin-right: ${length.margin};
	margin-bottom: ${length.margin};
`;

export const FilterButton = styled.button`
	${components.button};
	width: fit-content;
	margin-left: auto;
	height: 34px;
	@media (max-width: 768px) {
		margin-left: 0;
	}
`;

export const ResourcePageHead = styled.div`
	${layout.row};
	margin: ${length.margin} ${length.margin} 0 ${length.margin};
	display: flex;
	flex-wrap: wrap;
`;

export const ResourceFilters = styled.div`
 	${layout.row};
 	flex-wrap: nowrap;
 	overflow: visible;
`;
