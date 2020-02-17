import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { useNav, useRequest } from '../../Hooks';
import { ProjectList, CreateProjectButton } from './Style';
import ProjectFeed from './ProjectFeed';
import { Project } from './Types';
import CreateProjectModal from './CreateProjectModal';

const Projects: React.FC<RouteComponentProps> = ({ history }) => {
	const [showModal, setShowModal] = useState(false);
	useNav('Open Hive');
	const [projects, setProjects, isLoading] = useRequest<Project[]>(
		'projects',
		'get',
	);

	return (
		<ProjectList>
			{showModal && (
				<CreateProjectModal
					projects={projects}
					setProjects={setProjects}
					setShowModal={setShowModal}
				/>
			)}
			<CreateProjectButton onClick={() => setShowModal(true)}>
				Start a project
			</CreateProjectButton>
			{projects && <ProjectFeed projects={projects} />}
		</ProjectList>
	);
};

export default withRouter(Projects);
