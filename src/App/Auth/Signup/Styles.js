import styled from 'styled-components';
import { color, components, font, layout, length } from '../../../Styles/SharedStyles';

export const UsernameInput = styled.div`
	${layout.row};
	margin: ${length.margin};
	& input {
		${components.input};
	}
	& span {
		${font.text};
		color: red;
		margin-left: ${length.margin};
		line-height: 36px;
	}
`;

export const Password1Input = styled.div`
	${layout.row};
	margin: ${length.margin};
	& input {
			${components.input};
	}
	& span {
		${font.text};
		color: red;
		margin-left: ${length.margin};
		line-height: 36px;
	}
`;

export const Password2Input = styled.div`
	${layout.row};
	margin: ${length.margin};
	& input {
			${components.input};
	}
	& span {
		${font.text};
		color: red;
		margin-left: ${length.margin};
		line-height: 36px;
	}
`;

export const SignupButton = styled.button`
	${components.button};
	${layout.row};
	margin: ${length.margin};	
`;
