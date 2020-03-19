import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useSpring } from 'react-spring';
import { ButtonContainer, Slider } from './Styles';
import { color, colorAdjust } from '../../../../Styles/SharedStyles';

type ToggleButtonProps = {
	state: boolean;
	setState: Dispatch<SetStateAction<boolean>>;
	onChange: any;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
	state,
	setState,
	onChange,
}) => {
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
	useEffect(() => {
		onChange();
	}, [onChange, state]);
	return (
		<ButtonContainer style={animateBGColor}>
			<Slider onClick={() => setState(!state)} style={animateSlider} />
		</ButtonContainer>
	);
};

export default ToggleButton;
