import styled from 'styled-components';
import { color, components, layout, length } from '../../../Styles/sharedStyles';

export const ServerDownContainer = styled.div`
height: 100%;
width: 100%;
	${layout.row};
`;

export const ServerDownCard = styled.div`
	margin: auto auto;
	padding: ${length.margin};
	height: 20%;
	border-radius: ${length.radius};
	background-color: ${color.siteBG3};
`;

export const ErrorStatus = styled.div`
	
	${layout.row};
	
	& span {
		margin: 0 auto;

		color: #ffffff;
		font-size: 36px;
	}
`;

export const ErrorMessage = styled.div`
	${layout.row};

	& span {
		margin: 0 auto;
		padding: ${length.margin};
		color: #ffffff;
		font-size: 24px;
	}
`;

export const RetryButton = styled.button`
	margin: 0 auto;
	${components.button};
	color: #ffffff;
`;
