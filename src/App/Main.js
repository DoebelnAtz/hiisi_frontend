import Feed from './Feed/Feed';
import Profile from './Profile/Profile';
import React, { Fragment, useRef } from 'react';

import { Route, Switch, useLocation } from 'react-router-dom';

import UserPage from './User/UserPage';
import { useTransition, animated } from 'react-spring';
import Coalition from './Coalition/Coalition';
import Notifications from './Notifications/Notifications';
import MessageHome from './Messages/MessageHome';
import OpenHive from './OpenHive';
import ProjectPage from './OpenHive/ProjectPage';
import TaskInfo from './Board/Column/Task/TaskInfo';
import Messages from './Messages/Messages';
import Resources from './Resources';
import ResourcePage from './Resources/ResourcePage';

export default (prop) => {
	const location = useLocation();
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
					path={'/message_home/'}
					render={(props) => <MessageHome {...props} />}
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
				<Route
					exact
					path={'/resources'}
					render={(props) => <Resources {...props} />}
				/>
				<Route
					exact
					path={'/resources/:rid'}
					render={(props) => <ResourcePage {...props} />}
				/>
			</Switch>
			<Route
				path={'/projects/:pid'}
				render={(props) => <ProjectPage {...props} />}
			></Route>
			<Route
				exact
				path={'/projects/:pid/tasks/:tid'}
				render={(props) => <TaskInfo {...props} />}
			></Route>
		</Fragment>
	);
};
