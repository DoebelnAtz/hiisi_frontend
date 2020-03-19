import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useSpring } from 'react-spring';
import { ButtonContainer, Slider } from './Styles';
import { color, colorAdjust } from '../../../../Styles/SharedStyles';

type ToggleButtonProps = {
	state: boolean;
	onClick: any;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ state, onClick }) => {
	const BGConfig = {
		mass: 11,
		tension: 150,
		friction: 60,
		clamp: true,
		velocity: 6,
	};
	const animateSlider = useSpring({
		config: BGConfig,
		transform: state ? 'translateX(22px)' : 'translateX(0px)',
	});
	const animateBGColor = useSpring({
		backgroundColor: !state
			? colorAdjust.darken(color.secondary, 0.2)
			: colorAdjust.darken(color.tertiary, 0.2),
	});

	return (
		<ButtonContainer style={animateBGColor}>
			<Slider onClick={onClick} style={animateSlider} />
		</ButtonContainer>
	);
};

export default ToggleButton;
