import React from 'react';
import { ColorDiv, ColorPickerDiv } from './Styles';

type ColorPickerProps = {
	colors?: string[];
	onChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
	colors = [
		'#c76177',
		'#cc7a81',
		'#d6b376',
		'#dbcb6e',
		'#a8c47e',
		'#8aba86',
		'#6fb4c9',
		'#729de0',
		'#9b88cf',
		'#cf97c8',
	],
	onChange,
}) => {
	const mapColor = () => {
		return colors.map((color) => {
			return <ColorDiv onClick={() => onChange(color)} color={color} />;
		});
	};

	return <ColorPickerDiv>{mapColor()}</ColorPickerDiv>;
};

export default ColorPicker;
