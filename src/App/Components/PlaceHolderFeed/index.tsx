import React, { Fragment } from 'react';
import PlaceholderCard from './PlaceholderCard';

// This components is shown before the actual data is fetched.

const PlaceHolderFeed: React.FC = () => {
	return (
		<Fragment>
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
		</Fragment>
	);
};

export default PlaceHolderFeed;
