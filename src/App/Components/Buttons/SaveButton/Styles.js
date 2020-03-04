import styled from 'styled-components';
import { color, components } from '../../../../Styles/SharedStyles';

export const SaveButton = styled.button`
	${components.button};
	z-index: 2;
	transition: border-color 0.4s;
	border: 1px solid
		${(props) =>
			props.saved ? color.tertiary : props.error ? 'red' : color.primary};
`;
