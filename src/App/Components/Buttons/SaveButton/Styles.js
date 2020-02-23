import styled from 'styled-components';
import { color, components } from '../../../../Styles/sharedStyles';

export const SaveButton = styled.button`
	${components.button};
	transition: border-color 0.4s;
	border: 1px solid
		${(props) =>
			props.saved ? color.tertiary : props.error ? 'red' : color.primary};
`;
