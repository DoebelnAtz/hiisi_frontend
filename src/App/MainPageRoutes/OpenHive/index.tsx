import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { useNav, useRequest } from '../../../Hooks/index';
import { ProjectList, CreateProjectButton, ProjectButtonRow } from './Style';
import ProjectFeed from './ProjectFeed/index';
import { Project } from './Types/index';
import CreateProjectModal from './CreateProjectModal/index';
import DropDown from '../../Components/DropDown/index';
import PlaceHolderFeed from '../../Components/PlaceHolderFeed/index';

const Projects: React.FC<RouteComponentProps> = ({ history }) => {
	const [showModal, setShowModal] = useState(false);
	const [sortBy, setSortBy] = useState('popular');
	const [reverse, setReverse] = useState('false');
	useNav('Open Hive');
	const [projects, setProjects, isLoading] = useRequest<Project[]>(
		`projects?page=1&order=${sortBy}&reverse=${reverse}`,
		'get',
	);

	const onSortSelect = (sort: string) => {
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
					text={'Sort By: '}
					optionList={['popular', 'recent', 'title']}
					width={'160px'}
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
