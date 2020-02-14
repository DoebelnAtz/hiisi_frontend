import styled from 'styled-components';
import {
	components,
	modal,
	length,
	layout,
	color,
} from '../../../Styles/sharedStyles';

export const OutsideDiv = styled.div`
	${modal.outside};
`;

export const InsideDiv = styled.div`
	padding: ${length.margin};
	${modal.inside};
`;

export const TitleInput = styled.input`
	${components.input};
`;

export const LinkInput = styled.input`
	margin: ${length.margin} 0;
	${components.input};
`;

export const Description = styled.div`
	width: 100%;
	height: calc(100% - 100px);
	margin-bottom: ${length.margin};
`;

export const ButtonRow = styled.div`
	${layout.row};
`;

export const SubmitButton = styled.button`
	${components.button};
`;
