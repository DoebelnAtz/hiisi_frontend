import Feed from '../Forum/index';
import Profile from '../Profile/Profile';
import React, {
	Fragment,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

import { Route, Switch, useLocation } from 'react-router-dom';

import UserPage from '../Profile/UserPage';
import PostPage from '../Forum/PostPage';
import { useTransition, animated } from 'react-spring';
import Notifications from '../Notifications/Notifications';
import OpenHive from '../OpenHive';
import ProjectPage from '../OpenHive/ProjectPage';
import TaskInfo from '../Board/Column/Task/TaskInfo';
import Messages from '../Messages/MessageRoom';
import Resources from '../Resources';
import ResourcePage from '../Resources/ResourcePage';
import { getLocal } from '../../utils/utils';
import { useNotifications } from '../../Hooks';
import ErrorMessage from '../ErrorPages/ErrorModal/index';
import { ErrorContext } from '../../Context/ErrorContext';

const MainRoutes: React.FC = (prop) => {
	const location = useLocation();

	let userId = getLocal('token')?.user?.u_id;
	if (!userId) {
		localStorage.clear();
		window.location.replace('/login');
	}
	const [notifications, connected] = useNotifications(userId);
	const { state: error } = useContext(ErrorContext);
	console.log(error);
	return (
		<Fragment>
			{!!error.length && <ErrorMessage />}
			<Switch location={location}>
				<Route
					exact
					path={'/openhive'}
					render={(props) => <OpenHive {...props} />}
				/>
				<Route
					exact
					path={'/profile/'}
					render={(props) => <Profile {...props} />}
				/>
				<Route
					exact
					path={'/notifications/'}
					render={(props) => <Notifications />}
				/>

				<Route exact path={'/user/:uid'}>
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
			<Route path={'/forum'} render={() => <Feed />} />
			<Route exact path={'/forum/:bid'} render={() => <PostPage />} />

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

export default MainRoutes;
