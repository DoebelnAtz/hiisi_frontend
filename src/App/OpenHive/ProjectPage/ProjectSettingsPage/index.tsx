import React, { useState } from 'react';
import { useRequest } from '../../../../Hooks';
import { Project } from '../../Types';
import { User } from '../../../../Types';
import { Collaborator, ProjectCollaborators, OptionRow } from './Styles';

type ProjectSettingsProps = {
	project: Project;
};

const ProjectSettings: React.FC<ProjectSettingsProps> = ({ project }) => {
	const [projectCollaborators, setProjectCollaborators] = useRequest<User[]>(
		`projects/collaborators?projectId=${project.project_id}`,
		'GET',
	);

	const mapCollaborators = () => {
		if (projectCollaborators) {
			return projectCollaborators.map((collaborator) => {
				return (
					<Collaborator key={collaborator.u_id}>
						<img
							key={collaborator.u_id}
							className={'collaborator_avatar'}
							src={collaborator.profile_pic}
							alt={'profile_pic'}
						/>
					</Collaborator>
				);
			});
		} else {
			return <div style={{ marginBottom: '28px' }}>Loading...</div>;
		}
	};

	return (
		<div>
			<OptionRow>
				Collaborators:{' '}
				<ProjectCollaborators>
					{mapCollaborators()}
				</ProjectCollaborators>
			</OptionRow>
			<OptionRow>
				Title:
				<span>{project.title}</span>
			</OptionRow>
			<OptionRow>
				Link:
				<span>{project.link}</span>
			</OptionRow>
		</div>
	);
};

export default ProjectSettings;
