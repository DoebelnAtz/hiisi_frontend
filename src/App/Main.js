import Feed from './Feed';
import Profile from './Profile/Profile';
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';

import { Route, Switch, useLocation } from 'react-router-dom';

import UserPage from './User/UserPage';
import { useTransition, animated } from 'react-spring';
import Coalition from './Coalition/Coalition';
import Notifications from './Notifications/Notifications';
import MessageHome from './Messages/MessageHome';
import OpenHive from './OpenHive/index';
import ProjectPage from './OpenHive/ProjectPage/index';
import TaskInfo from './Board/Column/Task/TaskInfo';
import Messages from './Messages/Messages';
import Resources from './Resources/index';
import ResourcePage from './Resources/ResourcePage';
import { getLocal } from '../utils/utils';
import { NotificationContext } from '../Context/NotificationContext';
import { useNotifications } from '../Hooks';

export default (prop) => {
	const location = useLocation();
	const [socket, setSocket] = useState();

	const transitions = useTransition(
		location,
		(location) => location.pathname,
		{
			from: { display: 'none', opacity: 0, transform: 'translateX(50%)' },
			enter: {
				display: 'block',
				position: 'relative',
				opacity: 1,
				transform: 'translateX(0%)',
			},
			leave: {
				display: 'none',
				position: 'relative',
				opacity: 0,
				transform: 'translateX(0%)',
			},
		},
	);
	let userId = getLocal('token')?.user?.u_id;
	if (!userId) {
		localStorage.clear();
		window.location.replace('/login')
	}
	const [notifications, connected] = useNotifications();
	//  React-spring useTransition causes a bug where a component is
	//  mounted multiple times, disabled for now
	//  TODO: fix this bug..

	const renderCount = useRef(1);

	return (
		//transitions.map(({ item, props, key }) => (
		<Fragment>
			<Switch location={location}>
				<Route
					exact
					path={'/openhive'}
					render={(props) => <OpenHive {...props} />}
				/>
				<Route
					exact
					path={'/blog'}
					render={(props) => <Feed renderCount={renderCount} />}
				/>
				<Route
					exact
					path={'/profile/'}
					render={(props) => <Profile {...props} />}
				/>
				<Route
					exact
					path={'/notifications/'}
					render={(props) => <Notifications {...props} />}
				/>
				<Route
					exact
					path={'/coalition/'}
					render={(props) => <Coalition {...props} />}
				/>

				<Route exact path={'/search/user/:uid'}>
					<UserPage />
				</Route>
				<Route
					exact
					path={'/messages/:tid'} // useTransition in main causes a UI bug
					render={(
						props, // in this component, moved here for now
					) => <Messages {...props} />}
				/>
			</Switch>
			<Route
				path={'/resources'}
				render={(props) => <Resources {...props} />}
			/>
			<Route
				exact
				path={'/resources/:rid'}
				render={(props) => <ResourcePage {...props} />}
			/>
			<Route
	path={'/projects/:pid'}
	render={(props) => <ProjectPage {...props} />}
	/>
			<Route
	exact
	path={'/projects/:pid/tasks/:tid'}
	render={(props) => <TaskInfo {...props} />}
	/>
		</Fragment>
	);
};
