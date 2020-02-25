import React, { useRef, useState } from 'react';
import { SearchInput, SearchDiv, SearchResults, ResultItem } from './Styles';
import { useDismiss, useRequest } from '../../../Hooks/index';
import { ResultType } from './Types/index';
import { useHistory } from 'react-router';
import UsrIcon from '../../../Assets/ProfileS.png';
import ResourceIcon from '../../../Assets/TreeS.png';
const SearchBar: React.FC = () => {
	const [searchInput, setSearchInput] = useState('');
	const [results, setResults, isLoading] = useRequest<ResultType[]>(
		`search?q=${searchInput.toLowerCase()}`,
		'get',
		{},
		!!searchInput.length,
	);

	const inside = useRef<HTMLDivElement>(null);
	const close = () => {
		setSearchInput('');
		setResults([]);
		setSelectedIndex(0);
	};
	const [selectedIndex, setSelectedIndex] = useState(0);

	useDismiss(inside, close);
	const history = useHistory();
	const search = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;

		if (!target.value.length) {
			setSearchInput('');
			setResults([]);
			setSelectedIndex(0);
		} else {
			setSearchInput(target.value);
		}
	};

	const handleSelectResult = (result: ResultType) => {
		setResults([]);
		setSearchInput('');
		setSelectedIndex(0);
		history.push(`${result.link}/${result.id}`);
	};

	const renderResultList = () => {
		if (results) {
			return results.map((result, index: number) => {
				return (
					<ResultItem
						key={index}
						highlighted={selectedIndex === index}
						onClick={() => {
							handleSelectResult(result);
						}}
					>
						<img
							src={
								result.type === 'user' ? UsrIcon : ResourceIcon
							}
							alt={`${result.type}`}
						/>
						<span>{result.title}</span>
					</ResultItem>
				);
			});
		}
	};

	const handleEnterPress = (e: React.KeyboardEvent) => {
		if (results) {
			if (e.key === 'Enter' && results.length > selectedIndex) {
				handleSelectResult(results[selectedIndex]);
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				if (selectedIndex < results.length - 1) {
					setSelectedIndex(selectedIndex + 1);
				}
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				if (selectedIndex > 0) {
					setSelectedIndex(selectedIndex - 1);
				}
			}
		}
	};

	return (
		<SearchDiv>
			<SearchInput
				showingResults={!!results?.length}
				value={searchInput}
				onChange={(e: React.SyntheticEvent) => search(e)}
				placeholder={'search'}
				onKeyDown={(e: React.KeyboardEvent) => handleEnterPress(e)}
			/>
			<SearchResults ref={inside} showingResults={!!results?.length}>
				{renderResultList()}
			</SearchResults>
		</SearchDiv>
	);
};

export default SearchBar;
