import React, { Fragment, useState } from 'react';
import { useRequest } from '../../../../Hooks';
import { ProjectCardType } from '../Types';
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
	const [nextProjects] = useRequest<
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

			</Feed>
			{showNext && nextProjects && (
					<ProjectFeed
						page={page + 1}
						projects={nextProjects}
						sortBy={sortBy}
						reverse={reverse}
					/>
				)}
			{!showNext && projects.length >= 14 && !!nextProjects?.length &&(
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
