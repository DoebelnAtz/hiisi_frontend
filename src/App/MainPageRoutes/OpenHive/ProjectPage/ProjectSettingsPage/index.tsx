import React, { Dispatch, SetStateAction } from 'react';
import { useRequest } from '../../../../../Hooks';
import { Project } from '../../Types';
import { User } from '../../../../../Types';
import { Collaborator, ProjectCollaborators, OptionRow } from './Styles';

type ProjectSettingsProps = {
	project: Project;
	setProject: Dispatch<SetStateAction<Project | undefined>>;
};

const ProjectSettings: React.FC<ProjectSettingsProps> = ({
	project,
	setProject,
}) => {
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

	const handleLinkChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setProject({ ...project, link: target.value });
	};

	const handleTitleChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setProject({ ...project, title: target.value });
	};

	return (
		<div>
			<OptionRow>
				<label>
					Title:
					<input value={project.title} onChange={handleTitleChange} />
				</label>
			</OptionRow>
			<OptionRow>
				<label>
					Link:
					<input value={project.link} onChange={handleLinkChange} />
				</label>
			</OptionRow>
		</div>
	);
};

export default ProjectSettings;
