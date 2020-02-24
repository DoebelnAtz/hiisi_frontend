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
	};

	useDismiss(inside, close);
	const history = useHistory();
	const search = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;

		if (!target.value.length) {
			setSearchInput('');
			setResults([]);
		} else {
			setSearchInput(target.value);
		}
	};

	const renderResultList = () => {
		if (results) {
			return results.map((result, index: number) => {
				return (
					<ResultItem
						key={index}
						onClick={() => {
							setResults([]);
							setSearchInput('');
							history.push(`${result.link}/${result.id}`);
						}}
					>
						<img
							src={
								result.type === 'user' ? UsrIcon : ResourceIcon
							}
						/>
						<span>{result.title}</span>
					</ResultItem>
				);
			});
		}
	};
	return (
		<SearchDiv>
			<SearchInput
				showingResults={!!results?.length}
				value={searchInput}
				onChange={(e: React.SyntheticEvent) => search(e)}
				placeholder={'search'}
			/>
			<SearchResults ref={inside} showingResults={!!results?.length}>
				{renderResultList()}
			</SearchResults>
		</SearchDiv>
	);
};

export default SearchBar;
