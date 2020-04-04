import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ProjectCardType } from '../../Types';
import ArrowUpVoted from '../../../../../Assets/ArrowUpVoted.png';
import ArrowUp from '../../../../../Assets/ArrowUp.png';
import ArrowDownVoted from '../../../../../Assets/ArrowDownVoted.png';
import ArrowDown from '../../../../../Assets/ArrowDown.png';
import { formatDate } from '../../../../../Utils';
import ShareImg from '../../../../../Assets/Share.png';
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
} from '../../../../../Styles/CardStyles';
import { makeRequest } from '../../../../../Api';
import { useWidth } from '../../../../../Hooks';
import {
	MobileArrowImage,
	MobileCard,
	MobileCardAuthor,
	MobileCardButtons,
	MobileCardContainer,
	MobileCardContent,
	MobileCardDate,
	MobileCardInfo,
	MobileCardTitle,
	MobileCardTitleInfo,
	MobileCopiedSpan,
	MobileShareButton,
	MobileVoteCount,
} from '../../../../../Styles/MobileCardStyles';


type ProjectCardProps = {
	project: ProjectCardType;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const history = useHistory();
	const [votes, setVotes] = useState<number>(project.votes);
	const [voted, setVoted] = useState<vote>(project.vote ? project.vote : 0);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [copied, setCopied] = useState(false);
	const [, isMobile] = useWidth();
	const voteProject = async (vote: vote, projectId: number, diff: number) => {
		if (!disabled) {
			// prevent possible bugs caused by spamming
			setDisabled(true);
			setVotes(Number(votes) + diff);
			setVoted(vote);
			let resp = await makeRequest('projects/vote_project', 'post', {
				vote: vote,
				projectId: projectId,
			});
			if (!resp?.data) {
				// To make the UI feel more responsive we set states before we make a
				// request, then set them back if the request fails
				setVoted(voted);
				setVotes(Number(votes) - diff);
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
		try {
			// on http connections this function fails
			navigator.clipboard.writeText(text);
			setTimeout(() => {
				setCopied(false);
			}, 700);
		} catch (e) {
			setCopied(false);
		}
	};
	if (isMobile) {
		return (
			<MobileCard>
				<MobileCardContainer>
					<MobileCardInfo>
						<MobileCardAuthor>
							{project.private ? 'Private' : 'Public'}
						</MobileCardAuthor>
						<MobileCardDate>
							{formatDate(project.published_date)}
						</MobileCardDate>
					</MobileCardInfo>
					<MobileCardContent
						onClick={() =>
							history.push(`/projects/${project.project_id}`)
						}
					>
						<MobileCardTitleInfo>
							<MobileCardTitle>{project.title}</MobileCardTitle>
						</MobileCardTitleInfo>
						<CollaboratorList style={{ margin: '10px 0 0 -4px' }}>
							{project.collaborators.map(
								(profile_pic, index: number) => {
									return (
										<img
											style={{
												height: '36px',
												width: '36px',
											}}
											key={index}
											src={profile_pic}
											alt={'profile_pic'}
										/>
									);
								},
							)}
						</CollaboratorList>
					</MobileCardContent>
					<MobileCardButtons>
						<MobileArrowImage>
							<img
								src={voted > 0 ? ArrowUpVoted : ArrowUp}
								alt={'arrow up'}
								onClick={() =>
									handleUpClick(1, project.project_id)
								}
							/>
						</MobileArrowImage>
						<MobileVoteCount>
							<span>{votes}</span>
						</MobileVoteCount>
						<MobileArrowImage>
							<img
								src={voted < 0 ? ArrowDownVoted : ArrowDown}
								alt={'arrow down'}
								onClick={() =>
									handleDownClick(-1, project.project_id)
								}
							/>
						</MobileArrowImage>
						<MobileCopiedSpan copied={copied}>
							Copied!
						</MobileCopiedSpan>
						<MobileShareButton>
							<img
								onClick={() =>
									handleShareClick(
										`${window.location.href}/${project.project_id}`,
									)
								}
								src={ShareImg}
								alt={'share'}
							/>
						</MobileShareButton>
					</MobileCardButtons>
				</MobileCardContainer>
			</MobileCard>
		);
	} else {
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
							onClick={() =>
								handleDownClick(-1, project.project_id)
							}
						/>
					</ArrowImage>
				</CardVotes>
				<CardContent
					onClick={() =>
						history.push(`/projects/${project.project_id}`)
					}
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
						{project.collaborators.map(
							(profile_pic, index: number) => {
								return (
									<img
										key={index}
										src={profile_pic}
										alt={'profile_pic'}
									/>
								);
							},
						)}
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
							alt={'share'}
						/>
						<CopiedSpan copied={copied}>Copied!</CopiedSpan>
					</ShareButton>
				</CardButtons>
			</Card>
		);
	}
};

export default ProjectCard;
