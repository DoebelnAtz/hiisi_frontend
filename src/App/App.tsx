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
import {
	MainContainer,
	MainPageHeader,
	MainPage,
	MainView,
	SideNavCol,
} from './Style';
import Messages from './Messages';
import { NotificationContextProvider } from '../Context/NotificationContext';

const App = () => {
	return (
		<DndProvider backend={Backend}>
			<ErrorContextProvider>
				<CurrentNavContextProvider>
					<NotificationContextProvider>
						<Switch>
							<Route
								exact
								path={'/505/'}
								component={ServerDown}
							/>
							<Route exact path={'/login/'} component={Login} />
							<Route
								exact
								path={'/redirect/'}
								component={Redirect}
							/>
							<Route path={'/'}>
								<MainContainer>
									<MainPageHeader>
										<Header />
									</MainPageHeader>
									<MainPage>
										<SideNavCol>
											<SideNav />
										</SideNavCol>
										<MainView>
											<Main />
										</MainView>
									</MainPage>
									<Messages />
								</MainContainer>
							</Route>
						</Switch>
					</NotificationContextProvider>
				</CurrentNavContextProvider>
			</ErrorContextProvider>
		</DndProvider>
	);
};

export default App;
