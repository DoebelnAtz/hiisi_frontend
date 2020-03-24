import React from 'react';
import { color, colorAdjust } from '../../../../Styles/SharedStyles';

type PlaceholderTextProps = {
	height: string;
	style?: any
};

const PlaceholderText: React.FC<PlaceholderTextProps> = ({height, children, style }) => {
	return (
		<span
			style={{
				...style,
				backgroundColor: colorAdjust.darken(color.siteBG2, 0.1),
				fontSize: height,
				color: colorAdjust.darken(color.siteBG2, 0.1)
			}}
		>
			{children}
		</span>
	);
};

export default PlaceholderText;
