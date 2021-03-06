import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useNav, useRequest, useWidth } from '../../../../Hooks';
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
	ProjectDescription,
	BackToProjectsButton,
	DashBoard,
	GitHubLink,
} from './Style';
import { RouteComponentProps, User } from '../../../../Types';
import { Project } from '../Types';
import TextEditor from '../../../Components/TextEditor';
import { ChatContext } from '../../../../Context/ChatContext';
import ArrowLeft from '../../../../Assets/ArrowLeft.png';
import ProjectSettings from './ProjectSettingsPage';
import { makeRequest } from '../../../../Api';
import SaveButton from '../../../Components/Buttons/SaveButton';
import queryString from 'query-string';
import { RowDiv } from '../../../../Styles/LayoutStyles';
import { getLocal } from '../../../../Utils';

const OpenHiveProjectPage: React.FC<RouteComponentProps<{ pid: number }>> = ({
	match,
	history,
}) => {
	const [pid, setPid] = useState(match.params.pid);
	const [, isMobile] = useWidth();
	const [dashState, setDashState] = useState(
		queryString.parse(history.location.search)?.comment
			? 'comments'
			: isMobile
			? 'comments'
			: 'board',
	);
	const [project, setProject, isLoading] = useRequest<Project>(
		'projects/' + pid,
		'get',
	);
	const { update: setCurrentChat } = useContext(
		ChatContext,
	);
	useNav('Projects');

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
							expand={true}
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
				privateProject: project.private,
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
				<BackToProjectsButton onClick={() => history.push('/projects')}>
					<RowDiv>
						<img src={ArrowLeft} alt={'back to projects'} />
						<span>Projects</span>
					</RowDiv>
				</BackToProjectsButton>
				<SaveButton onClick={handleProjectSave}>Save</SaveButton>

				{project && (
					<GitHubLink
						onClick={() => window.open(validateUrl(project?.link))}
					>
						Code
					</GitHubLink>
				)}
			</ProjectInfo>
			<ProjectTitle>
				<span>
					{!isLoading && project
						? capitalizeFirst(project.title)
						: 'Loading...'}
				</span>
			</ProjectTitle>
			{project && (
				<ProjectDescription>
					<TextEditor
						editable={project.contributor}
						state={project.description}
						setState={(e: string) => updateProjectDescription(e)}
					/>
				</ProjectDescription>
			)}
			<ProjectDashBoard>
				<ProjectDashboardNav>
					{!isMobile && (
						<ProjectDashBoardNavItem
							focus={dashState.toLowerCase() === 'board'}
							onClick={() => setDashState('board')}
						>
							<span>Board</span>
						</ProjectDashBoardNavItem>
					)}
					<ProjectDashBoardNavItem
						focus={dashState.toLowerCase() === 'comments'}
						onClick={() => setDashState('comments')}
					>
						<span>Comments</span>
					</ProjectDashBoardNavItem>
					{project?.contributor && (
						<Fragment>
							{project?.creator ===
								getLocal('token').user.u_id && (
								<ProjectDashBoardNavItem
									focus={
										dashState.toLowerCase() === 'settings'
									}
									onClick={() => setDashState('settings')}
								>
									<span>Settings</span>
								</ProjectDashBoardNavItem>
							)}
							<ProjectDashBoardNavItem
								onClick={() => {
									setCurrentChat(project.t_id);
									if (isMobile) history.push('/messages');
								}}
							>
								<span>Chat</span>
							</ProjectDashBoardNavItem>
						</Fragment>
					)}
				</ProjectDashboardNav>
				<DashBoard>{!isLoading && renderDash()}</DashBoard>
			</ProjectDashBoard>
		</ProjectPage>
	);
};

export default withRouter(OpenHiveProjectPage);
