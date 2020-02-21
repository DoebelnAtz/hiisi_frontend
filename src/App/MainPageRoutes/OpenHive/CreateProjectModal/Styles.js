import styled from 'styled-components';
import {
	components,
	modal,
	length,
	layout,
	color,
} from '../../../../Styles/sharedStyles';

export const OutsideDiv = styled.div`
	${modal.outside};
	z-index: 5;
`;

export const InsideDiv = styled.div`
	padding: ${length.margin};
	${modal.inside};
	z-index: 5;
`;

export const TitleInput = styled.input`
	${components.input};
	width: 40%;
`;

export const LinkInput = styled.input`
	margin: ${length.margin} 0;
	margin-left: auto;
	${components.input};
	width: 40%;
`;

export const Description = styled.div`
	width: 100%;
	height: calc(100% - 140px);
	margin-bottom: ${length.margin};
`;

export const ButtonRow = styled.div`
	${layout.row};
`;

export const SubmitButton = styled.button`
	${components.button};
`;
