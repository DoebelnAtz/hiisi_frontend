import styled from 'styled-components';
import { color } from '../../../../Styles/SharedStyles'
import { animated } from 'react-spring';

export const ButtonContainer = styled(animated.div)`
	height: 22px;
	width: 62px;
	border-radius: 10px;
	border: 2px solid ${color.siteBG3};
	background-color: ${color.siteBG2};
`;

export const Slider = styled(animated.div)`
	height: 22px;
	position: relative;
	border-radius: 6px;
	width: 40px;
	background-color: ${color.siteBG4};
`;
