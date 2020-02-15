import React, { useEffect, useState } from 'react';
import { useNav, useRequest } from '../../../Hooks';
import { BrowserRouterProps, withRouter } from 'react-router-dom';

import Board from '../../Board';
import Messages from '../../Messages/MessageRoom/index';
import ViewPost from '../../Feed/Post/ViewPost';
import { capitalizeFirst } from '../../../utils/utils';
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
import { RouteComponentProps, User } from '../../../Types';
import { Project } from '../Types';
import TextEditor from '../../Components/TextEditor';

const OpenHiveProjectPage: React.FC<RouteComponentProps<{ pid: number }>> = ({
	match,
	history,
}) => {
	const [pid, setPid] = useState(match.params.pid);
	const [dashState, setDashState] = useState('board');
	const [project, setProject, isLoading] = useRequest<Project>(
		'projects/' + pid,
		'get',
	);
	useNav('Open Hive');

	console.log(isLoading);
	useEffect(() => {
		setPid(match.params.pid);
	}, [match.params.pid]);

	const renderDash = () => {
		console.log(project);
		if (project)
			switch (dashState) {
				case 'board':
					return (
						<Board
							projectCollaborators={project.collaborators}
							board_id={project.board_id}
						/>
					);
				case 'chat':
					break;
				default:
					return (
						<ViewPost
							focusList={{
								focus: project.collaborators.map(
									(user: User) => user.username,
								),
								title: 'collaborator',
							}}
							commentthread={project.commentthread}
						/>
					);
			}
	};

	const updateProjectDescription = (e: string) => {
		if (project) setProject({ ...project, description: e });
	};

	return (
		<ProjectPage>
			<ProjectInfo>
				<ProjectTitle>
					{!isLoading && project
						? capitalizeFirst(project.title)
						: 'Loading...'}
				</ProjectTitle>
				<ProjectLink>
					{!isLoading && project && <a href={project.link}>link</a>}
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
						onClick={() => setDashState('board')}
					>
						<span>Board</span>
					</ProjectDashBoardNavItem>
					<ProjectDashBoardNavItem
						onClick={() => setDashState('comments')}
					>
						<span>Comments</span>
					</ProjectDashBoardNavItem>
					{project?.contributor && (
						<ProjectDashBoardNavItem
							onClick={() =>
								history.push(`/messages/${project.t_id}`)
							}
						>
							<span>Chat</span>
						</ProjectDashBoardNavItem>
					)}
				</ProjectDashboardNav>
				{!isLoading && renderDash()}
			</ProjectDashBoard>
		</ProjectPage>
	);
};

export default withRouter(OpenHiveProjectPage);
