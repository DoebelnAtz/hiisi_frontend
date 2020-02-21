import styled from 'styled-components';
import { components } from '../../../../Styles/sharedStyles';

export const InputButtonDiv = styled.div`
	width: 100%;
`;

export const InputSection = styled.input`
	${components.input};
	border-radius: 4px 0 0 4px;
	width: calc(100% - 83px);
	height: 36px;
`;

export const ButtonSection = styled.button`
	${components.button};
	border-left: none;
	border-radius: 0 4px 4px 0;
	width: 70px;
	height: 40px
`;
