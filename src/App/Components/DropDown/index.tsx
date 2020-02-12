import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import { DropDown, DropDownList, Option, CurrentOption } from './Styles';
import { useDismiss } from '../../../Hooks';
import { capitalizeFirst } from '../../../utils/utils';
type DropDownProps = {
	state: string;
	setState: Dispatch<SetStateAction<string>>;
	optionList: string[];
	width?: number;
	height: number;
	text?: string;
};

const DropDownComponent: React.FC<DropDownProps> = ({
	state,
	setState,
	optionList,
	width = 100,
	height,
	text,
}) => {
	const [expanded, setExpanded] = useState(false);
	const inside = useRef<HTMLDivElement>(null);
	const renderOptions = () => {
		return optionList.map((option: string, index: number) => {
			return (
				<Option key={index} onClick={() => setState(option)}>
					{option}
				</Option>
			);
		});
	};

	useDismiss(inside, () => setExpanded(false));

	return (
		<DropDown
			expanded={expanded}
			onClick={() => setExpanded(!expanded)}
			style={{
				width: `${width}px`,
				height: `${height}px`,
			}}
			ref={inside}
		>
			<CurrentOption style={{ lineHeight: `${height}px` }}>
				<span>{`${text}${capitalizeFirst(state)}`}</span>
			</CurrentOption>
			{expanded && (
				<DropDownList height={height} style={{ width: `${width}px` }}>
					{renderOptions()}
				</DropDownList>
			)}
		</DropDown>
	);
};

export default DropDownComponent;
