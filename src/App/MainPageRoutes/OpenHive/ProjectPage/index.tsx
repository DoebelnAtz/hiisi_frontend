import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useNav, useRequest } from '../../../../Hooks';
import { withRouter } from 'react-router-dom';

import Board from '../../../Components/Board/index';
import ViewPost from '../../../Components/CommentThread';
import { capitalizeFirst, validateUrl } from '../../../../Utils/';
import {
	ProjectPage,
	ProjectInfo,
	ProjectDashBoard,
	ProjectTitle,
	ProjectDashboardNav,
	ProjectDashBoardNavItem,
	ProjectLink,
	ProjectDescription,
} from './Style';
import { RouteComponentProps, User } from '../../../../Types';
import { Project } from '../Types';
import TextEditor from '../../../Components/TextEditor';
import { ChatContext } from '../../../../Context/ChatContext';
import { color } from '../../../../Styles/SharedStyles';
import ProjectSettings from './ProjectSettingsPage';
import { makeRequest } from '../../../../Api';
import SaveButton from '../../../Components/Buttons/SaveButton/';
import queryString from 'query-string';
const OpenHiveProjectPage: React.FC<RouteComponentProps<{ pid: number }>> = ({
	match,
	history,
}) => {
	const [pid, setPid] = useState(match.params.pid);
	const [dashState, setDashState] = useState(
		queryString.parse(history.location.search)?.comment
			? 'comments'
			: 'board',
	);
	const [project, setProject, isLoading] = useRequest<Project>(
		'projects/' + pid,
		'get',
	);
	const { state: currentChat, update: setCurrentChat } = useContext(
		ChatContext,
	);
	useNav('Open Hive');

	useEffect(() => {
		setPid(match.params.pid);
	}, [match.params.pid]);

	const renderDash = () => {
		if (project)
			switch (dashState) {
				case 'board':
					return (
						<Board
							projectCollaborators={project.collaborators}
							board_id={project.board_id}
							editable={project.contributor}
						/>
					);
				case 'settings':
					return (
						<ProjectSettings
							project={project}
							setProject={setProject}
						/>
					);
				default:
					return (
						<ViewPost
							focusList={{
								focus: project.collaborators.map(
									(user: User) => user.username,
								),
								title: 'collaborator',
							}}
							OPAuthorId={0}
							commentthread={project.commentthread}
						/>
					);
			}
	};
	const updateProjectDescription = (e: string) => {
		if (project) setProject({ ...project, description: e });
	};

	const handleProjectSave = async () => {
		if (project) {
			let resp = await makeRequest(`projects/update_project`, 'PUT', {
				projectId: project.project_id,
				title: project.title,
				description: project.description,
				link: project.link,
			});
			if (resp.data) {
				setProject({
					...project,
					title: resp.data.title,
					description: resp.data.description,
				});
				return true;
			}
		}
		return false;
	};

	return (
		<ProjectPage>
			<ProjectInfo>
				<SaveButton onClick={handleProjectSave}>Save</SaveButton>
				<ProjectTitle>
					{!isLoading && project
						? capitalizeFirst(project.title)
						: 'Loading...'}
				</ProjectTitle>
				<ProjectLink>
					{!isLoading && project && (
						<a href={validateUrl(project.link)}>link</a>
					)}
				</ProjectLink>
			</ProjectInfo>
			<ProjectDescription>
				<TextEditor
					editable={project?.contributor}
					state={project?.description}
					setState={(e: string) => updateProjectDescription(e)}
				/>
			</ProjectDescription>

			<ProjectDashBoard>
				<ProjectDashboardNav>
					<ProjectDashBoardNavItem
						focus={dashState.toLowerCase() === 'board'}
						onClick={() => setDashState('board')}
					>
						<span>Board</span>
					</ProjectDashBoardNavItem>
					<ProjectDashBoardNavItem
						focus={dashState.toLowerCase() === 'comments'}
						onClick={() => setDashState('comments')}
					>
						<span>Comments</span>
					</ProjectDashBoardNavItem>
					{project?.contributor && (
						<Fragment>
							<ProjectDashBoardNavItem
								onClick={() => setCurrentChat(project.t_id)}
								style={{
									borderRight: `1px solid ${color.primary}`,
								}}
							>
								<span>Chat</span>
							</ProjectDashBoardNavItem>
							<ProjectDashBoardNavItem
								focus={dashState.toLowerCase() === 'settings'}
								onClick={() => setDashState('settings')}
							>
								<span>Settings</span>
							</ProjectDashBoardNavItem>
						</Fragment>
					)}
				</ProjectDashboardNav>
				{!isLoading && renderDash()}
			</ProjectDashBoard>
		</ProjectPage>
	);
};

export default withRouter(OpenHiveProjectPage);
