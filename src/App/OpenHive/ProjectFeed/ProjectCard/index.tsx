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
	ShareButton,
	CopiedSpan,
} from '../../../../Styles/CardStyles';
import { makeRequest } from '../../../Api/Api';

type ProjectCardProps = {
	project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const history = useHistory();
	const [votes, setVotes] = useState<number>(project.votes);
	const [voted, setVoted] = useState<vote>(project.vote ? project.vote : 0);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [copied, setCopied] = useState(false);

	const voteProject = async (vote: vote, projectId: number, diff: number) => {
		if (!disabled) {
			setDisabled(true); // prevent possible bugs caused by spamming
			setVotes(votes + diff);
			let backUp = voted;
			setVoted(vote);
			let resp = await makeRequest('projects/vote_project', 'post', {
				vote: vote,
				projectId: projectId,
			});
			if (!resp?.data) {
				// To make the UI feel more responsive we set states before we make a
				// request, then set them back if the request fails
				setVoted(voted);
				setVotes(votes - diff);
			}
			setDisabled(false);
		}
	};

	const handleUpClick = async (vote: vote, projectId: number) => {
		if (voted === 1) {
			await voteProject(0, projectId, -1);
		} else if (voted === -1) {
			await voteProject(vote, projectId, 2);
		} else {
			await voteProject(vote, projectId, 1);
		}
	};

	const handleDownClick = async (vote: vote, projectId: number) => {
		if (voted === -1) {
			await voteProject(0, projectId, 1);
		} else if (voted === 1) {
			await voteProject(vote, projectId, -2);
		} else {
			await voteProject(vote, projectId, -1);
		}
	};

	const handleShareClick = (text: string) => {
		setCopied(true);
		navigator.clipboard.writeText(text);
		setTimeout(() => {
			setCopied(false);
		}, 700);
	};
	console.log(window);
	return (
		<Card>
			<CardVotes>
				<ArrowImage>
					<img
						src={voted > 0 ? ArrowUpVoted : ArrowUp}
						alt={'arrow_up'}
						onClick={() => handleUpClick(1, project.project_id)}
					/>
				</ArrowImage>
				<VoteCount>
					<span>{votes}</span>
				</VoteCount>
				<ArrowImage>
					<img
						src={voted < 0 ? ArrowDownVoted : ArrowDown}
						alt={'arrow_down'}
						onClick={() => handleDownClick(-1, project.project_id)}
					/>
				</ArrowImage>
			</CardVotes>
			<CardContent
				onClick={() => history.push(`/projects/${project.project_id}`)}
			>
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
			<CardButtons>
				<ShareButton>
					<img
						onClick={() =>
							handleShareClick(
								`${window.location.origin}/projects/${project.project_id}`,
							)
						}
						src={ShareImg}
					/>
					<CopiedSpan copied={copied}>Copied!</CopiedSpan>
				</ShareButton>
			</CardButtons>
		</Card>
	);
};

export default ProjectCard;
