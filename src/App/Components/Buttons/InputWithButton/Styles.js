import styled from 'styled-components';
import { components } from '../../../../Styles/SharedStyles';

export const InputButtonDiv = styled.div`
	width: 100%;
`;

export const InputSection = styled.input`
	${components.input};
	position: relative;
	padding: 0 6px 0 8px;
	line-height: 38px;
	border-radius: 4px 0 0 4px;
	width: calc(100% - 86px);
	height: 38px;
`;

export const ButtonSection = styled.button`
	${components.button};
	border-left: none;
	padding: 0;
	position: relative;
	top: -1px;
	line-height: 38px;
	border-radius: 0 4px 4px 0;
	width: 70px;
	height: 40px
`;
