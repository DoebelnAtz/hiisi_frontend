import React, { SetStateAction, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { ErrorContextProvider } from '../Context/ErrorContext';
import IntraContext from '../Context/IntraContext';
import Redirect from './Auth/Redirect';
import Header from './Header';
import SideNav from './Nav/SideNav';
import Main from './Main';
import Login from './Auth/Login';
import './base.css';
import ServerDown from './ErrorPages/ServerDown';
import { CurrentNavContextProvider } from '../Context/CurrentNavContext';

const App = () => {
	return (
		<DndProvider backend={Backend}>
			<ErrorContextProvider>
				<CurrentNavContextProvider>
					<Switch>
						<Route exact path={'/505/'} component={ServerDown} />
						<Route exact path={'/login/'} component={Login} />
						<Route exact path={'/redirect/'} component={Redirect} />
						<Route path={'/'}>
							<div id={'main_container'}>
								<div
									id={'main_page_header'}
									className={'row mx-0'}
								>
									<Header />
								</div>
								<div id={'main_page'} className={'row m-0'}>
									<div id={'nav_col'}>
										<SideNav />
									</div>
									<div id={'main_view'}>
										<Main />
									</div>
								</div>
							</div>
						</Route>
					</Switch>
				</CurrentNavContextProvider>
			</ErrorContextProvider>
		</DndProvider>
	);
};

export default App;
