import React, { useState } from 'react';
import { useNav, useRequest, useWidth } from '../../../Hooks';
import {
	Resources,
	SubmitResourceButton,
	FilterButton,
	ResourcePageHead,
	ResourceFilters,
} from './Styles';

import SubmitResource from './SubmitResource/index';
import { getLocal, setLocal } from '../../../Utils';
import { RouteComponentProps } from 'react-router';
import { ResourceListType, Tag } from './Types';
import DropDown from '../../Components/DropDown';
import ResourcesResourceFeed from './ResourceFeed';
import PlaceHolderFeed from '../../Components/PlaceHolderFeed';

const ResourcesHome: React.FC<RouteComponentProps> = ({ history }) => {
	const [filter, setFilter] = useState('none');
	const [sortBy, setSortBy] = useState(
		getLocal('resourceSortPref')?.sortBy || 'popular',
	);
	const [reverse, setReverse] = useState(
		getLocal('resourceSortPref')?.reverse || 'false',
	);
	const [show, setShow] = useState('all');
	const [width, isMobile] = useWidth();
	const [tags, ,] = useRequest<Tag[]>('resources/tags?q=&limit=100', 'get');
	const [resources, setResources, ] = useRequest<ResourceListType[]>(
		`resources?page=1&filter=${filter}&order=${sortBy}&reverse=${reverse}&show=${show}`,
		'get',
	);
	useNav('resources');
	const [popup, setPopup] = useState(false);

	const onSortSelect = (sort: string) => {
		if (sort === sortBy) {
			// Save sorting preference to localstorage
			setLocal('resourceSortPref', {
				sortBy: sort,
				reverse: reverse === 'true' ? 'false' : 'true',
			});
			setReverse(reverse === 'true' ? 'false' : 'true');
		} else {
			setLocal('resourceSortPref', { sortBy: sort });
			setReverse('false');
			setSortBy(sort);
		}
	};

	const onFilterSelect = (newFilter: string) => {
		if (newFilter === filter) {
			setFilter('none');
		} else {
			setFilter(newFilter);
		}
	};

	const onShowSelect = (newShow: string) => {
		if (newShow === show) {
			setShow('all');
		} else {
			setShow(newShow);
		}
	};

	return (
		<Resources>
			{popup && resources && (
				<SubmitResource
					resources={resources}
					setResources={setResources}
					popup
					setPopup={setPopup}
				/>
			)}

			<ResourcePageHead>
				<SubmitResourceButton
					isMobile={isMobile}
					onClick={() => setPopup(true)}
				>
					Submit Resource
				</SubmitResourceButton>
				<ResourceFilters>
					<DropDown
						width={`${
							isMobile ? `calc(${width}px / 3 - 13px)` : `160px`
						}`}
						text={'Sort: '}
						height={'32px'}
						state={sortBy}
						setSelect={onSortSelect}
						optionList={['popular', 'recent', 'title']}
					>
						<i className={'fas fa-sort'} />
					</DropDown>

					<DropDown
						width={`${
							isMobile ? `calc(${width}px / 3 - 13px)` : `166px`
						}`}
						height={'32px'}
						state={filter}
						text={'Filter: '}
						withFilter={true}
						setSelect={onFilterSelect}
						optionList={
							tags ? tags.map((tag) => tag.title) : ['loading..']
						}
					/>

					<DropDown
						state={show}
						text={`Show: `}
						setSelect={onShowSelect}
						optionList={['all', 'submitted', 'saved']}
						width={`${
							isMobile ? `calc(${width}px / 3 - 14px)` : `146px`
						}`}
						height={'32px'}
					/>
				</ResourceFilters>
				{width > 870 && (
					<FilterButton onClick={() => setFilter('none')}>
						Remove filter
					</FilterButton>
				)}
			</ResourcePageHead>
			{(resources && (
				<ResourcesResourceFeed
					pagination={2}
					reverse={reverse}
					sortBy={sortBy}
					show={show}
					filterBy={filter}
					setFilter={setFilter}
					resources={resources}
					setResources={setResources}
				/>
			)) || <PlaceHolderFeed />}
		</Resources>
	);
};

export default ResourcesHome;
