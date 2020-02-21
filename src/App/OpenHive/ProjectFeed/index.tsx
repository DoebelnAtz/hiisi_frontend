import React, { Fragment, useState } from 'react';
import { useRequest } from '../../../Hooks';
import { Project } from '../Types';
import ProjectCard from './ProjectCard';
import { MoreButton } from '../../Forum/ForumFeed/Styles';
import PlusIcon from '../../../Assets/Plus.png';

type ProjectFeedProps = {
	projects: Project[];
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
	const [nextProjects, setNextProjects, isLoading] = useRequest<Project[]>(
		`projects?page=${page}&order=${sortBy}&reverse=${reverse}`,
		'get',
		{},
		projects.length >= 10,
	);
	const [showNext, setShowNext] = useState(false);

	const renderProject = () => {
		return projects.map((project: Project) => {
			return <ProjectCard key={project.project_id} project={project} />;
		});
	};

	return (
		<Fragment>
			{renderProject()}
			{showNext && nextProjects && (
				<ProjectFeed
					page={page + 1}
					projects={nextProjects}
					sortBy={sortBy}
					reverse={reverse}
				/>
			)}
			{!showNext && projects.length >= 10 && (
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