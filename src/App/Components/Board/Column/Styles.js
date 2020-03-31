import styled from 'styled-components';

import {
	color,
	colorAdjust,
	components,
	cursor,
	font,
	layout,
	length,
} from '../../../../Styles/SharedStyles';

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 5px;
	padding: 0 5px 5px 5px;
	height: 100%;
	width: calc(20% - 20px);
	box-shadow: 2px 2px 3px rgba(0,0,0,0.3);

	border-radius: 3px;
	background: ${color.siteBG3};
`;

export const WipLimit = styled.div`
	position: relative;
	& div {
		position: absolute;
		visibility: hidden;
		width: 95px;
		z-index: 8;
		text-align: center;
		padding: 4px;
		border-radius: ${length.radius};
		background-color: ${color.siteBG4};
		transform: translate(-110px, -22px);
	}
	& div::after {
		content: '  ';
		position: absolute;
		top: 25%;
		left: 105%;
		margin-left: -6px;
		border-width: 6px;
		border-style: solid;
		border-color: transparent transparent transparent ${color.siteBG4};
	}
	& span {
		${font.text};
		font-size: 14px;
	}
`;

export const TaskCount = styled.span`
	margin: 10px 0 0 auto;
	font-size: 14px;
	color: ${(props) => (props.wipExceeded ? color.secondary : 'inherit')};
	&:hover {
		& ${WipLimit} div {
			visibility: visible;
		}
	}
`;

export const ColumnList = styled.div`
	height: 100%;
	padding: 2px;
	box-shadow: inset 0 0 7px rgba(0,0,0,0.2);
	border-radius: 4px;
	min-height: 20px;
	width: calc(100% - 4px);
	background-color: ${color.siteBG2};
`;

export const Dot = styled.div`
	height: 8px;
	width: 8px;
	border-radius: 5px;
	margin-right: 3px;
	background-color: ${color.siteBG4};
`;

export const ExpandOptions = styled.div`
	${layout.row};
	margin-bottom: ${length.margin};
	padding: 4px 0 4px 3px;
	${cursor.clickable};
	border-radius: 2px;
	width: fit-content;
	&:hover {
		background-color: ${color.siteBG2};
	}
`;

export const ColumnOptions = styled.div`
	background-color: ${color.siteBG2};
	transition: height 0.3s, margin-bottom 0.5s;
	border-radius: ${length.radius};
	height: ${(props) => (props.expanded ? '58px' : '0')};
	margin-bottom: ${(props) => (props.expanded ? length.margin : '0')};
	overflow: hidden;
`;

export const WipIncrease = styled.div`
	width: 0;
	height: 0;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;

	border-left: 10px solid ${color.siteBG3};
	transition: border-left-color 0.1s;
	&:hover {
		border-left-color: ${colorAdjust.darken(color.siteBG3, 0.1)};
	}
`;

export const WipDecrease = styled.div`
	width: 0;
	height: 0;
	margin-left: auto;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;

	border-right: 10px solid ${color.siteBG3};
	transition: border-right-color 0.1s;
	&:hover {
		border-right-color: ${colorAdjust.darken(color.siteBG3, 0.1)};
	}
`;

export const WipLimitToggler = styled.div`
	margin: 0 5px;
`;

export const WipLimitInput = styled.div`
	margin: 5px;
	${layout.row};
	& span {
		${font.text};
	}
`;

export const ColumnOptionsButtonRow = styled.div`
	${layout.row};
	& button {
	}
`;

export const AcceptOptionBtn = styled.button`
	${components.button};
	background-color: ${color.siteBG3};
	border: none;
	line-height: 24px;
	height: 24px;
	margin-left: auto;
	&:hover {
		background-color: ${colorAdjust.darken(color.siteBG3, 0.05)};
	}
`;

export const RejectOptionBtn = styled.button`
	${components.button};
	background-color: ${color.siteBG3};
	border: none;
	line-height: 24px;
	height: 24px;
	margin-left: 5px;
	margin-right: 5px;
	&:hover {
		background-color: ${colorAdjust.darken(color.siteBG3, 0.05)};
	}
`;

export const ColumnTitle = styled.input`
	padding: 4px 5px 5px;
	margin: 5px 0 0;
	text-transform: uppercase;
	border: none;
	font-size: 17px;
	color: ${color.primary};
	width: calc(100% - 62px);
	background: ${color.siteBG3};
	height: 22px;
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
	height: 30px;
	background-color: ${color.siteBG1};
	margin-bottom: ${length.margin};
`;
