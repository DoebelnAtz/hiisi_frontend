import React from 'react';
import {
	ArrowImage,
	Card,
	CardAuthor,
	CardButtons,
	CardContent,
	CardDate,
	CardInfo,
	CardTitle,
	CardTitleInfo,
	CardVotes,
	CopiedSpan,
	DeleteButton,
	ShareButton,
	VoteCount,
} from '../../../../Styles/CardStyles';
import ArrowUpVoted from '../../../../Assets/ArrowUpVoted.png';
import ArrowUpPlaceholder from '../../../../Assets/ArrowUpPlaceholder.png';
import ArrowDownVoted from '../../../../Assets/ArrowDownVoted.png';
import ArrowDownPlaceholder from '../../../../Assets/ArrowDownPlaceholder.png';
import { formatDate } from '../../../../Utils/index';
import DeleteImg from '../../../../Assets/x.png';
import ShareImg from '../../../../Assets/Share.png';
import PlaceholderText from '../PlaceholderText';
import { color, colorAdjust } from '../../../../Styles/SharedStyles';

const PlaceholderCard: React.FC = () => {
	return (
		<Card>
			<CardVotes>
				<ArrowImage>
					<img src={ArrowUpPlaceholder} alt={'arrow_up'} />
				</ArrowImage>
				<VoteCount>
					<span
						style={{
							color: colorAdjust.darken(color.siteBG2, 0.1),
							backgroundColor: colorAdjust.darken(color.siteBG2, 0.1)
						}}
					>
						0
					</span>
				</VoteCount>
				<ArrowImage>
					<img src={ArrowDownPlaceholder} alt={'arrow_down'} />
				</ArrowImage>
			</CardVotes>
			<CardContent>
				<CardTitleInfo>
					<CardTitle>
						<PlaceholderText height={'24px'} width={'170px'} />
					</CardTitle>
					<CardInfo>
						<CardDate>
							<PlaceholderText height={'20px'} width={'100px'} />
						</CardDate>
						<CardAuthor>
							<PlaceholderText height={'20px'} width={'60px'} />
						</CardAuthor>
					</CardInfo>
				</CardTitleInfo>
			</CardContent>
			<CardButtons></CardButtons>
		</Card>
	);
};

export default PlaceholderCard;
