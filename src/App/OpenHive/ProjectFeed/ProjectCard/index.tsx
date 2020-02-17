import React, { useState } from 'react';
import { User } from '../../../../Types';
import { useHistory } from 'react-router-dom';
import { Project } from '../../Types';
import ArrowUpVoted from '../../../../Assets/ArrowUpVoted.png';
import ArrowUp from '../../../../Assets/ArrowUp.png';
import ArrowDownVoted from '../../../../Assets/ArrowDownVoted.png';
import ArrowDown from '../../../../Assets/ArrowDown.png';
import { formatDate } from '../../../../utils/utils';
import DeleteImg from '../../../../Assets/x.png';
import ShareImg from '../../../../Assets/Share.png';
import { vote } from '../../../Resources/Types';
import { CollaboratorList } from './Styles';
import {
	Card,
	CardContent,
	CardVotes,
	CardInfo,
	CardButtons,
	CardDate,
	CardTitle,
	ArrowImage,
	VoteCount,
	CardTitleInfo,
} from '../../../../Styles/CardStyles';

type ProjectCardProps = {
	project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const history = useHistory();
	const [votes, setVotes] = useState<number>(project.votes);
	const [voted, setVoted] = useState<vote>(project.vote ? project.vote : 0);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [copied, setCopied] = useState(false);
	const handleShareClick = (text: string) => {
		setCopied(true);
		navigator.clipboard.writeText(text);
		setTimeout(() => {
			setCopied(false);
		}, 700);
	};

	return (
		<Card onClick={() => history.push(`/projects/${project.project_id}`)}>
			<CardVotes>
				<ArrowImage>
					<img
						src={voted > 0 ? ArrowUpVoted : ArrowUp}
						alt={'arrow_up'}
					/>
				</ArrowImage>
				<VoteCount>
					<span>{votes}</span>
				</VoteCount>
				<ArrowImage>
					<img
						src={voted < 0 ? ArrowDownVoted : ArrowDown}
						alt={'arrow_down'}
					/>
				</ArrowImage>
			</CardVotes>
			<CardContent>
				<CardTitleInfo>
					<CardTitle>{project.title}</CardTitle>
					<CardInfo>
						<CardDate>
							{formatDate(project.published_date)}
						</CardDate>
					</CardInfo>
				</CardTitleInfo>
				<CollaboratorList>
					{project.collaborators.map((collaborator: User) => {
						return (
							<img
								key={collaborator.u_id}
								src={collaborator.profile_pic}
							/>
						);
					})}
				</CollaboratorList>
			</CardContent>
			<CardButtons></CardButtons>
		</Card>
	);
};

export default ProjectCard;
