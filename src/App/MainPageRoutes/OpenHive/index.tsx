import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { useNav, useRequest } from '../../../Hooks';
import { ProjectList, CreateProjectButton, ProjectButtonRow } from './Style';
import ProjectFeed from './ProjectFeed';
import { Project } from './Types';
import CreateProjectModal from './CreateProjectModal';
import DropDown from '../../Components/DropDown';
import PlaceHolderFeed from '../../Components/PlaceHolderFeed/index';
import { getLocal, setLocal } from '../../../Utils';

const Projects: React.FC<RouteComponentProps> = ({ history }) => {
	const [showModal, setShowModal] = useState(false);
	const [sortBy, setSortBy] = useState(
		getLocal('OHSortPref')?.sortBy || 'popular',
	);
	const [reverse, setReverse] = useState('false');
	useNav('Open Hive');
	const [projects, setProjects, isLoading] = useRequest<Project[]>(
		`projects?page=1&order=${sortBy}&reverse=${reverse}`,
		'get',
	);

	const onSortSelect = (sort: string) => {
		// Save sorting preference to localstorage
		setLocal('OHSortPref', { sortBy: sort });
		if (sort === sortBy) {
			setReverse(reverse === 'true' ? 'false' : 'true');
		} else {
			setReverse('false');
			setSortBy(sort);
		}
	};

	return (
		<ProjectList>
			{showModal && (
				<CreateProjectModal
					projects={projects}
					setProjects={setProjects}
					setShowModal={setShowModal}
				/>
			)}
			<ProjectButtonRow>
				<CreateProjectButton onClick={() => setShowModal(true)}>
					Start a project
				</CreateProjectButton>
				<DropDown
					state={sortBy}
					setSelect={onSortSelect}
					text={`${reverse === 'false' ? '▼' : '▲'} Sort by: `}
					optionList={['popular', 'recent', 'title']}
					width={'175px'}
					height={'34px'}
				/>
			</ProjectButtonRow>
			{(projects && (
				<ProjectFeed
					page={1}
					sortBy={sortBy}
					reverse={reverse}
					projects={projects}
				/>
			)) || <PlaceHolderFeed />}
		</ProjectList>
	);
};

export default withRouter(Projects);
