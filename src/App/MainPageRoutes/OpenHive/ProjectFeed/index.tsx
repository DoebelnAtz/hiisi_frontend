import React, { Fragment, useState } from 'react';
import { useRequest } from '../../../../Hooks';
import { Project, ProjectCardType } from '../Types';
import ProjectCard from './ProjectCard/index';
import PlusIcon from '../../../../Assets/Plus.png';
import { Feed, MoreButton } from '../../../../Styles/CardStyles';

type ProjectFeedProps = {
	projects: ProjectCardType[];
	page: number;
	reverse: string;
	sortBy: string;
};

const ProjectFeed: React.FC<ProjectFeedProps> = ({
	projects,
	page,
	sortBy,
	reverse,
}) => {
	const [nextProjects, setNextProjects, isLoading] = useRequest<
		ProjectCardType[]
	>(
		`projects?page=${page}&order=${sortBy}&reverse=${reverse}`,
		'get',
		{},
		projects.length >= 14,
	);
	const [showNext, setShowNext] = useState(false);

	const renderProject = () => {
		return projects.map((project: ProjectCardType) => {
			return <ProjectCard key={project.project_id} project={project} />;
		});
	};

	return (
		<Fragment>
			<Feed>
				{renderProject()}
				{showNext && nextProjects && (
					<ProjectFeed
						page={page + 1}
						projects={nextProjects}
						sortBy={sortBy}
						reverse={reverse}
					/>
				)}
			</Feed>
			{!showNext && projects.length >= 14 && (
				<MoreButton>
					<img
						src={PlusIcon}
						alt={'load more posts'}
						onClick={() => setShowNext(true)}
					/>
				</MoreButton>
			)}
		</Fragment>
	);
};

export default ProjectFeed;
