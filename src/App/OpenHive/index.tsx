import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { useNav, useRequest } from '../../Hooks';
import {
	CollaboratorList,
	ProjectItem,
	ProjectList,
	CreateProjectButton,
} from './Style';
import { User } from '../../Types';
import { Project } from './Types';
import CreateProjectModal from './CreateProjectModal';

const Projects: React.FC<RouteComponentProps> = ({ history }) => {
	const [projects, setProjects, isLoading] = useRequest<Project[]>(
		'projects',
		'get',
	);
	const [showModal, setShowModal] = useState(false);
	useNav('Open Hive');

	const renderProjects = () => {
		if (projects)
			return projects.map((project: Project) => {
				return (
					<ProjectItem
						key={project.project_id}
						onClick={() =>
							history.push(`/projects/${project.project_id}`)
						}
					>
						{project.title}
						<CollaboratorList>
							{project.collaborators.map((collaborator: User) => {
								return (
									<img
										key={collaborator.u_id}
										src={collaborator.profile_pic}
									/>
								);
							})}
						</CollaboratorList>
					</ProjectItem>
				);
			});
	};

	return (
		<ProjectList>
			{showModal && <CreateProjectModal setShowModal={setShowModal} />}
			<CreateProjectButton onClick={() => setShowModal(true)}>
				Start a project
			</CreateProjectButton>
			{!isLoading && renderProjects()}
		</ProjectList>
	);
};

export default withRouter(Projects);
