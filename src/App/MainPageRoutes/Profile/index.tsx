import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProfilePage from '../ProfilePage';
import { withRouter } from 'react-router-dom';
import { useNav, useRequest } from '../../../Hooks';
import UserProfile from './UserProfile';
// this component is nearly identical to UserPage but we retrieve the profile
// from users/me instead, this allows for further customization to your own page
// vs visiting page in the future

const Profile: React.FC = () => {
	useNav('profile'); // if page is refreshed, set nav to profile


	return (
		<Fragment>
			<Switch>}
				<Route path={`/user/me`}>
					<ProfilePage/>
				</Route>
				<Route path={`/user/:uid`}>
					<UserProfile/>
				</Route>
			</Switch>
		</Fragment>
	);
};

export default withRouter(Profile);
