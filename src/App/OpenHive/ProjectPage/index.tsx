import React, { useEffect, useState } from 'react';
import { useNav, useRequest } from '../../../Hooks';
import { BrowserRouterProps, withRouter } from 'react-router-dom';

import Board from '../../Board';
import Messages from '../../Messages/Messages';
import ViewPost from '../../Feed/Post/ViewPost';
import { capitalizeFirst } from '../../../utils/utils';
import {
	ProjectPage,
	ProjectInfo,
	ProjectDashBoard,
	ProjectTitle,
	ProjectDashboardNav,
	ProjectDashBoardNavItem,
} from './Style';
import { RouteComponentProps, User } from '../../../Types';
import { Project } from '../Types';

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
					return <Messages tid={project.t_id} />;
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

	return (
		<ProjectPage>
			<ProjectInfo>
				<ProjectTitle>
					{!isLoading && project
						? capitalizeFirst(project.title)
						: 'Loading...'}
				</ProjectTitle>
			</ProjectInfo>

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
