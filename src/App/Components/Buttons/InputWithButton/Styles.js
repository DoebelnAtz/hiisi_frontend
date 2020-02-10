import styled from 'styled-components';
import { components } from '../../../../Styles/sharedStyles';

export const InputSection = styled.input`
	${components.input};
	border-radius: 4px 0 0 4px;
	width: 60%;
	height: 40px;
`;

export const ButtonSection = styled.button`
	${components.button};
	border-left: none;
	border-radius: 0 4px 4px 0;
	width: 40%;
	height: 40px
`;
