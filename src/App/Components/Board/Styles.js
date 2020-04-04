import styled from 'styled-components';
import {
	color,
	cursor,
	layout,
	length,
} from '../../../Styles/SharedStyles';

export const BoardDiv = styled.div`
	width: 100%;
	height: 100%;
	overflow-y: hidden;
	overflow-x: hidden;
`;

export const Columns = styled.div`
	display: flex;
	width: 100%;
	z-index: 3;
`;

export const ColorFilterPicker = styled.div`
	z-index: 4;
	transform: translate(calc(-74px), calc(100% - 4px));
`;

export const ResetColorFilterDiv = styled.div`
	height: 20px;
	width: 20px;
	display: flex;
	border-radius: 10px;
	background-color: #ee6666;
	${cursor.clickable};
	transform: translate(30px, -12px);
	& span {
		line-height: 20px;
		margin: auto;
	}
`;

export const ColorFilter = styled.div`
	height: 36px;
	width: 36px;
	margin: auto ${length.margin};
	border-radius: 7px;
	background-color: ${props => props.color ?? color.siteBG3};
	border: 4px solid ${color.siteBG4};
`;

export const ProjectCollaborators = styled.div`
	${layout.row};
	margin: ${length.margin};
	margin-bottom: -10px;
	z-index: 0;
	& img {
		height: 42px;
		width: 42px;
		border-radius: 50%;
		margin-left: -8px;
		border: 4px solid ${color.siteBG3};
	}
`;

export const PlaceHolderCollaborator = styled.div`
	display: block;
	height: 42px;
	width: 42px;
	border-radius: 50%;
	margin-bottom: 25px;
	background-color: ${color.siteBG3};
`;

export const Collaborator = styled.div`
	position: relative;
	padding-bottom: 13px;
	transition: all 0.1s;
	bottom: ${(props) => (props.filtered ? '10px' : '0')};
	z-index: ${(props) => (props.filtered ? '2' : '1')};

	& img {
		border-color: ${(props) =>
			props.filtered
				? color.siteBG3
				: color.siteBG2};
	}
	&:hover {
		bottom: 10px;
		${cursor.clickable};
		z-index: 2 !important;
	}
`;
