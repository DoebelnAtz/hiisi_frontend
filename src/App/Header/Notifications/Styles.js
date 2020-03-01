import styled from 'styled-components';
import { color, length } from '../../../Styles/SharedStyles';

export const NotificationIcon = styled.div`
	position: relative;
	top: 2px;
	& img {
		width: 40px;
		height: 40px;
	}
	margin: auto ${length.margin} auto auto;
`;
