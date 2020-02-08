import React from 'react';

import ProfilePage from './ProfilePage';
import './profile.css';
import { withRouter } from 'react-router-dom';
import { useNav, useRequest } from '../../Hooks';

const Profile = () => {
	useNav('profile'); // if page is refreshed, set nav to profile

	const [profile, , isLoading] = useRequest(`users/me`, 'get');

	return !isLoading && <ProfilePage profile={profile} />;
};

export default withRouter(Profile);
