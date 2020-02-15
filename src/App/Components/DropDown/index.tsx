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
	state: string;
	setSelect: any;
	optionList: string[];
	width?: string;
	height: string;
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
			console.log('hit');
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
				<span>{`${text}${capitalizeFirst(state)}`}</span>
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
