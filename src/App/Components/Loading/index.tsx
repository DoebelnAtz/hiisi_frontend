import React, { useEffect, useState } from 'react';
import { LoadingDot, LoadingDotsDiv } from './Styles';
import { useMounted } from '../../../Hooks';

type LoadingDotsProps = {
	height: number;
	color: string;
	cycleSpeed?: number;
};

const LoadingDots: React.FC<LoadingDotsProps> = ({
	height,
	color,
	cycleSpeed = 1000,
}) => {
	const [dotState, setDotState] = useState(1);
	const mounted = useMounted();

	// not sure if this is a good solution but it works..
	const cycleDots = async () => {
		if (!mounted.current) return;
		setTimeout(() => {
			mounted.current && setDotState(2);

			setTimeout(() => {
				mounted.current && setDotState(3);

				setTimeout(() => {
					mounted.current && setDotState(1);
					cycleDots();
				}, cycleSpeed);
			}, cycleSpeed);
		}, cycleSpeed);
	};

	useEffect(() => {
		mounted.current = true;
		cycleDots();
		return () => {
			mounted.current = false;
		};
	}, []);

	return (
		<LoadingDotsDiv height={height}>
			<LoadingDot color={color} height={height} active={dotState === 1} />
			<LoadingDot color={color} height={height} active={dotState === 2} />
			<LoadingDot color={color} height={height} active={dotState === 3} />
		</LoadingDotsDiv>
	);
};

export default LoadingDots;
