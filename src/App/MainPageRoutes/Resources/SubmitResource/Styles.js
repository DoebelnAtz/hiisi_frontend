import styled from 'styled-components';
import {
	color,
	components,
	layout,
	length,
} from '../../../../Styles/sharedStyles';

export const OuterDiv = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 5;
`;

export const TitleAndLinkRow = styled.div`
	${layout.row};
`;

export const TitleInputDiv = styled.div`
	${layout.row};
	width: 40%;
	& span {
		font-size: 20px;
		margin-top: 3px;
		margin-right: ${length.margin};
	}
`;

export const TitleInput = styled.input`
	${components.input};
	width: calc(100% - 55px);
`;

export const LinkInputDiv = styled.div`
	${layout.row};
	margin-left: auto;
	width: 40%;
	& span {
		font-size: 20px;
		margin-top: 3px;
		margin-right: ${length.margin};
	}
`;

export const LinkInput = styled.input`
	${components.input};
	width: calc(100% - 55px);
`;

export const EditDescription = styled.div`
	margin-top: ${length.margin};
	height: calc(100% - 140px);
	& span {
		margin-bottom: ${length.margin};
		font-size: 20px;
	}
`;

export const ButtonRow = styled.div`
	${layout.row};
	position: absolute;
	top: calc(100% - 45px);
`;

export const SubmitResource = styled.div`
	position: absolute;
	padding: ${length.margin};
	${layout.col};
	left: 20%;
	right: 20%;
	top: 15%;
	bottom: 35%;
	color: ${color.primary};
	border: 5px solid ${color.siteBG2};
	border-radius: 2px;
	margin: auto;
	background: ${color.siteBG2};
	overflow: auto;
	z-index: 2 !important;
`;
