import Feed from './Forum/index';
import Profile from './Profile';
import React, { Fragment, useContext } from 'react';

import { Route, Switch, useLocation, Redirect } from 'react-router-dom';

import PostPage from './Forum/PostPage';
import OpenHive from './OpenHive';
import ProjectPage from './OpenHive/ProjectPage';
import TaskInfo from '../Components/Board/Column/Task/TaskInfo';
import Resources from './Resources';
import ResourcePage from './Resources/ResourcePage';
import { getLocal } from '../../Utils';
import ErrorMessage from '../ErrorPages/ErrorModal/index';
import { ErrorContext } from '../../Context/ErrorContext';
import MobileMessagePage from '../Messages/MobileMessagePage';
import MobileSearch from '../MobileSearch';

const MainRoutes: React.FC = (prop) => {
	const location = useLocation();

	let userId = getLocal('token')?.user?.u_id;
	if (!userId) {
		localStorage.clear();
		window.location.replace('/login');
	}
	const { state: error } = useContext(ErrorContext);

	return (
		<Fragment>
			{!!error.length && <ErrorMessage />}
			<Switch location={location}>
				<Route
					exact
					path={'/'}

				>
					<Redirect to={'/resources'}/>
				</Route>
				<Route
					exact
					path={'/projects'}
					render={(props) => <OpenHive {...props} />}
				/>
				<Route path={'/user'} render={(props) => <Profile />} />
				<Route
					exact
					path={'/messages'}
					render={() => <MobileMessagePage />}
				/>
				<Route exact path={'/search'} render={() => <MobileSearch />} />
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
