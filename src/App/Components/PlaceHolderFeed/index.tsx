import React, { Fragment } from 'react';
import PlaceholderCard from './PlaceholderCard';
import { Feed } from '../../../Styles/CardStyles';

// This components is shown before the actual data is fetched.

const PlaceHolderFeed: React.FC = () => {
	return (
		<Fragment>
			<Feed>
				<PlaceholderCard />
				<PlaceholderCard />
				<PlaceholderCard />
				<PlaceholderCard />
				<PlaceholderCard />
				<PlaceholderCard />
				<PlaceholderCard />
				<PlaceholderCard />
				<PlaceholderCard />
				<PlaceholderCard />
				<PlaceholderCard />
				<PlaceholderCard />
				<PlaceholderCard />
				<PlaceholderCard />
			</Feed>
		</Fragment>
	);
};

export default PlaceHolderFeed;
