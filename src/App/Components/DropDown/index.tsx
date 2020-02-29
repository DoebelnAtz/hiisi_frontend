import React, { useEffect, useRef, useState } from 'react';

import {
	DropDown,
	DropDownList,
	Option,
	CurrentOption,
	SearchInput,
} from './Styles';
import { useDismiss } from '../../../Hooks';
import { capitalizeFirst } from '../../../Utils';
type DropDownProps = {
	// currently selected option
	state: string;
	// function that takes a string input and is run on option change
	setSelect: (e: string) => void;
	// provided list of options
	optionList: string[];
	// Component height and width
	width: string;
	height: string;
	// Optional text snippet that prepends currently selected option
	// ex: text = 'sort by: , state = 'popular'
	// component would read sort by: popular
	text?: string;
	withFilter?: boolean;
	// in cases where we want the drop down to overflow a modal
	// the drop down list has to be fixed. the only use case for this is in the taskinfo modal
	// but this causes problems in scrolling pages like resources / forum / projects
	modalOverflow?: boolean;
};

const DropDownComponent: React.FC<DropDownProps> = ({
	state,
	setSelect,
	optionList,
	width = 100,
	height,
	text,
	withFilter = false,
	modalOverflow = false,
}) => {
	const [expanded, setExpanded] = useState(false);
	const [options, setOptions] = useState(optionList);
	const [filterInput, setFilterInput] = useState('');
	const inside = useRef<HTMLDivElement>(null);
	const filterInputRef = useRef<HTMLInputElement>(null);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const renderOptions = () => {
		return options.map((option: string, index: number) => {
			return (
				<Option
					key={index}
					highlighted={state === option || index === selectedIndex}
					onClick={() => {
						setSelect(option);
						setExpanded(false);
					}}
				>
					{option}
				</Option>
			);
		});
	};

	useDismiss(inside, () => setExpanded(false));

	// make sure input field is focused when user click on dropdown.
	useEffect(() => {
		if (filterInputRef && expanded) {
			filterInputRef.current?.focus();
		}
	}, [expanded]);

	// Filter options
	const handleFilterChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setFilterInput(target.value);
		setOptions(
			optionList.filter((option) => {
				return option
					.toLowerCase()
					.includes(target.value.toLowerCase());
			}),
		);
	};

	const handleEnterPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && options.length > selectedIndex) {
			setSelect(options[selectedIndex]);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (selectedIndex < options.length - 1) {
				setSelectedIndex(selectedIndex + 1);
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (selectedIndex > 0) {
				setSelectedIndex(selectedIndex - 1);
			}
		}
	};

	const handleClick = () => {
		setExpanded(!expanded);
	};

	return (
		<DropDown
			expanded={expanded}
			ref={inside}
			width={width}
			height={height}
		>
			<CurrentOption
				expanded={expanded}
				onClick={() => handleClick()}
				style={{ lineHeight: `${height}` }}
			>
				<span>{`${text ? text : ''}${capitalizeFirst(state)}`}</span>
			</CurrentOption>
			{expanded && (
				<DropDownList
					modalOverflow={modalOverflow}
					width={width}
					height={height}
				>
					{withFilter && (
						<SearchInput
							ref={filterInputRef}
							placeholder={'filter'}
							onChange={(e: React.SyntheticEvent) =>
								handleFilterChange(e)
							}
							onKeyDown={(e: React.KeyboardEvent) =>
								handleEnterPress(e)
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
