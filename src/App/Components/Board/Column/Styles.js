import styled from 'styled-components';

import {
	color,
	colorAdjust,
	components,
	font,
	length,
} from '../../../../Styles/SharedStyles';

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 5px;
	padding: 0 5px 5px 5px;
	height: 100%;
	width: calc(20% - 20px);
	border-radius: 3px;
	background: ${color.siteBG3};
`;

export const WipLimit = styled.div`
	position: absolute;
	visibility: hidden;
	z-index: 6;
	padding: 4px;
	border-radius: ${length.radius};
	background-color: ${color.siteBG4};
	transform: translate(-32px, -54px);
	&::after {
		content: '  ';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -6px;
		border-width: 6px;
		border-style: solid;
		border-color: ${color.siteBG4} transparent transparent transparent;
	}
	& span {
		${font.text};
		font-size: 14px;
	}
`;

export const TaskCount = styled.span`
	margin: 5px 0 0 auto;
	color: ${(props) => (props.wipExceeded ? 'red' : 'inherit')};
	&:hover {
		& ${WipLimit} {
			visibility: visible;
		}
	}
`;

export const ColumnList = styled.div`
	height: 100%;
	padding: 2px;
	border-radius: 4px;
	min-height: 20px;
	width: calc(100% - 4px);
	background-color: ${color.siteBG2};
`;

export const ColumnTitle = styled.input`
	padding: 4px 5px 5px;
	margin: 5px 0 0;
	text-transform: uppercase;
	border: none;
	font-size: 17px;
	color: ${color.primary};
	width: calc(100% - 70px);
	background: ${color.siteBG3};

	z-index: 3;
	&:hover {
		background: ${color.siteBG3};
	}
	&:focus {
		outline: none;
		background-color: ${color.siteBG1};
		border-radius: 4px;
	}
`;

export const AddTaskInput = styled.input`
	${components.input};
	background-color: ${color.siteBG1};
	margin: ${length.margin} 0;
`;
