import React, { SetStateAction, useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Redirect from './Auth/Redirect';
import Header from './Header';
import Nav from './Nav';
import Main from './MainPageRoutes';
import Login from './Auth/Login';
import './base.css';
import ServerDown from './ErrorPages/ServerDown/index';
import { ErrorContextProvider } from '../Context/ErrorContext';
import { NotificationContextProvider } from '../Context/NotificationContext';
import { CurrentNavContextProvider } from '../Context/CurrentNavContext';
import { ChatContextProvider } from '../Context/ChatContext';
import {
	MainContainer,
	MainPageHeader,
	MainPage,
	MainView,
	SideNavCol,
	ProductionStateLabel,
} from './Style';
import Messages from './Messages';
import { setLocal } from '../Utils/index';

const App: React.FC = () => {
	setLocal('darkmode', true);

	return (
		<ErrorContextProvider>
			<CurrentNavContextProvider>
				<NotificationContextProvider>
					<ChatContextProvider>
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
									<ProductionStateLabel>
										<span>Alpha</span>
									</ProductionStateLabel>
									<MainPageHeader>
										<Header />
									</MainPageHeader>
									<MainPage>
										<SideNavCol>
											<Nav />
										</SideNavCol>
										<MainView>
											<Main />
										</MainView>
									</MainPage>
									<Messages />
								</MainContainer>
							</Route>
						</Switch>
					</ChatContextProvider>
				</NotificationContextProvider>
			</CurrentNavContextProvider>
		</ErrorContextProvider>
	);
};

export default App;
