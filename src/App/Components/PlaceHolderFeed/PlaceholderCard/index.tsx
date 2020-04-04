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

	VoteCount,
} from '../../../../Styles/CardStyles';
import ArrowUpPlaceholder from '../../../../Assets/ArrowUpPlaceholder.png';
import ArrowDownPlaceholder from '../../../../Assets/ArrowDownPlaceholder.png';

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
						<PlaceholderText height={'20px'} style={{marginBottom: 'auto'}}>
							SampleTitle
						</PlaceholderText>
					</CardTitle>
					<CardInfo>
						<CardDate>
							<PlaceholderText style={{textAlign: 'right'}} height={'16px'}>
							15 days ago
							</PlaceholderText>
						</CardDate>
						<CardAuthor>
							<PlaceholderText style={{textAlign: 'right'}} height={'16px'}>Morko</PlaceholderText>
						</CardAuthor>
					</CardInfo>
				</CardTitleInfo>
			</CardContent>
			<CardButtons></CardButtons>
		</Card>
	);
};

export default PlaceholderCard;
