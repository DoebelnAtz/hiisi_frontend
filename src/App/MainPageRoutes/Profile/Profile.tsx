import React, { Fragment } from 'react';

import ProfilePage from './ProfilePage';
import './profile.css';
import { withRouter } from 'react-router-dom';
import { useNav, useRequest } from '../../../Hooks';

// this component is nearly identical to UserPage but we retrieve the profile
// from users/me instead, this allow for further customization to your own page
// vs visiting page in the future

const Profile: React.FC = () => {
	useNav('profile'); // if page is refreshed, set nav to profile

	const [profile, , isLoading] = useRequest(`users/me`, 'get');

	return (
		<Fragment>{!isLoading && <ProfilePage profile={profile} />}</Fragment>
	);
};

export default withRouter(Profile);
