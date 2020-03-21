import React from 'react';
import { color, colorAdjust } from '../../../../Styles/SharedStyles';

type PlaceholderTextProps = {
	height: string;
	width: string;
	style?: any
};

const PlaceholderText: React.FC<PlaceholderTextProps> = ({ height, width, style }) => {
	return (
		<span
			style={{
				...style,
				backgroundColor: colorAdjust.darken(color.siteBG2, 0.1),
				width: width,
				height: height,
				margin: '2px',
			}}
		/>
	);
};

export default PlaceholderText;
