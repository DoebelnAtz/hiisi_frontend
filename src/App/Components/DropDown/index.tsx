import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import {
	DropDown,
	DropDownList,
	Option,
	CurrentOption,
	SearchInput,
} from './Styles';
import { useDismiss } from '../../../Hooks';
import { capitalizeFirst } from '../../../utils/utils';
type DropDownProps = {
	state: string;
	setState: Dispatch<SetStateAction<string>>;
	optionList: string[];
	width?: string;
	height: string;
	text?: string;
	withFilter?: boolean;
};

const DropDownComponent: React.FC<DropDownProps> = ({
	state,
	setState,
	optionList,
	width = 100,
	height,
	text,
	withFilter = false,
}) => {
	const [expanded, setExpanded] = useState(false);
	const inside = useRef<HTMLDivElement>(null);
	const [options, setOptions] = useState(optionList);
	const [filterInput, setFilterInput] = useState('');
	const renderOptions = () => {
		return options.map((option: string, index: number) => {
			return (
				<Option
					key={index}
					onClick={() => {
						setState(option);
						setExpanded(false);
					}}
				>
					{option}
				</Option>
			);
		});
	};

	useDismiss(inside, () => setExpanded(false));

	const handleFilterChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		console.log(options, optionList);
		setFilterInput(target.value);
		setOptions(
			optionList.filter((option) => {
				return option
					.toLowerCase()
					.includes(target.value.toLowerCase());
			}),
		);
	};

	return (
		<DropDown
			expanded={expanded}
			ref={inside}
			style={{
				width: `${width}`,
				height: `${height}`,
			}}
		>
			<CurrentOption
				onClick={() => setExpanded(!expanded)}
				style={{ lineHeight: `${height}` }}
			>
				<span>{`${text}${capitalizeFirst(state)}`}</span>
			</CurrentOption>
			{expanded && (
				<DropDownList height={height} style={{ width: `${width}` }}>
					{withFilter && (
						<SearchInput
							placeholder={'filter'}
							onChange={(e: React.SyntheticEvent) =>
								handleFilterChange(e)
							}
							value={filterInput}
						/>
					)}
					{renderOptions()}
				</DropDownList>
			)}
		</DropDown>
	);
};

export default DropDownComponent;
