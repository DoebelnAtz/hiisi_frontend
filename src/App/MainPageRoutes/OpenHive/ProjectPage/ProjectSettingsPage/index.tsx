import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRequest } from '../../../../../Hooks';
import { Project } from '../../Types';
import { User } from '../../../../../Types';
import {
	Collaborator,
	ProjectCollaborators,
	OptionRow,
	UserResult,
	UserResultList,
	DeleteProjectButton,
} from './Styles';
import { makeRequest } from '../../../../../Api';
import { useHistory } from 'react-router-dom';
import ToggleButton from '../../../../Components/Buttons/ToggleButton';

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
	const [searchUserInputVal, setSearchUserInputVal] = useState('');
	const [userResults, setUserResults] = useRequest<User[]>(
		`users/search?q=${searchUserInputVal}`,
		'GET',
		{},
		!!searchUserInputVal.length,
	);
	const history = useHistory();

	const mapCollaborators = () => {
		if (projectCollaborators) {
			return projectCollaborators.map((collaborator) => {
				return (
					<Collaborator key={collaborator.u_id}>
						<img
							key={collaborator.u_id}
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

	const renderUserResults = () => {
		if (userResults && projectCollaborators) {
			return userResults
				.filter(
					(u) =>
						!projectCollaborators.find(
							(usr) => usr.u_id === u.u_id,
						),
				)
				.map((user) => {
					return (
						<UserResult
							onClick={() => handleResultClick(user.u_id)}
							key={user.u_id}
						>
							<img
								src={user.profile_pic}
								alt={`${user.username}`}
							/>
							<span>{user.username}</span>
						</UserResult>
					);
				});
		}
	};

	const handleCollaboratorChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setSearchUserInputVal(target.value);
		if (!target.value.length) {
			setUserResults([]);
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

	const handleResultClick = async (userId: number) => {
		let resp = await makeRequest('projects/add_user', 'POST', {
			projectId: project.project_id,
			userId: userId,
		});
		if (resp.data && projectCollaborators) {
			setProjectCollaborators([...projectCollaborators, resp.data]);
		}
	};

	const handleProjectDelete = async () => {
		if (window.confirm('Are you sure you want to delete this project')) {
			let resp = await makeRequest('projects/delete_project', 'DELETE', {
				projectId: project.project_id,
			});
			if (resp.data) {
				history.push('/openhive');
			}
		}
	};

	const handleProjectPrivacyChange = () => {
		setProject({ ...project, private: !project.private });
	};

	return (
		<div>
			<OptionRow>
				<DeleteProjectButton onClick={() => handleProjectDelete()}>
					DELETE PROJECT
				</DeleteProjectButton>
			</OptionRow>
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
			<OptionRow>
				<span style={{ margin: 'auto auto auto 0' }}>Private:</span>
				<ToggleButton
					state={project.private}
					onClick={handleProjectPrivacyChange}
				/>
			</OptionRow>
			<ProjectCollaborators>{mapCollaborators()}</ProjectCollaborators>
			<OptionRow>
				<label>
					Add Collaborators
					<input
						value={searchUserInputVal}
						placeholder={'Search users:'}
						onChange={(e: React.SyntheticEvent) =>
							handleCollaboratorChange(e)
						}
					/>
				</label>
			</OptionRow>
			<UserResultList>{renderUserResults()}</UserResultList>
		</div>
	);
};

export default ProjectSettings;
