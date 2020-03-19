import styled from 'styled-components';
import { layout } from './SharedStyles';


export const RowDiv = styled.div`
	${layout.row};
	margin: ${props => props.margin ? props.margin : '0'};
`;
