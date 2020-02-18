import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';

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
};

const DropDownComponent: React.FC<DropDownProps> = ({
	state,
	setSelect,
	optionList,
	width = 100,
	height,
	text,
	withFilter = false,
}) => {
	const [expanded, setExpanded] = useState(false);
	const [options, setOptions] = useState(optionList);
	const [filterInput, setFilterInput] = useState('');
	const inside = useRef<HTMLDivElement>(null);
	const filterInputRef = useRef<HTMLInputElement>(null);

	const renderOptions = () => {
		return options.map((option: string, index: number) => {
			return (
				<Option
					key={index}
					highlighted={state === option}
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

	useEffect(() => {
		if (filterInputRef && expanded) {
			filterInputRef.current?.focus();

		}
	}, [expanded]);

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
				<DropDownList width={width} height={height}>
					{withFilter && (
						<SearchInput
							ref={filterInputRef}
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
