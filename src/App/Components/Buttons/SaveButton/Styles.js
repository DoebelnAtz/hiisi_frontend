import styled from 'styled-components';
import { color, components } from '../../../../Styles/sharedStyles';

export const SaveButton = styled.div`
	${components.button};
	transition: border-color 0.3s;
	border: 1px solid ${props => props.saved ? color.tertiary : color.primary};
`;
