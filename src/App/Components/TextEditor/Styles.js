import styled from 'styled-components';
import { length } from '../../../Styles/SharedStyles';

export const TextEditor = styled.div`
	width: calc(100%);
	height: calc(100%);
	${props => props.error ? 'border: 2px solid red;' : ''};
	border-radius: ${length.radius};
`;
