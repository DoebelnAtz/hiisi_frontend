import styled from 'styled-components';
import { length } from '../../../Styles/SharedStyles';

export const TextEditor = styled.div`
	width: calc(100% - ${length.margin} * 2);
	height: calc(100% - ${length.margin} * 2);
	border-radius: ${length.radius};
`;
