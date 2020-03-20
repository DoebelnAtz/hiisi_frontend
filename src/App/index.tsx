import React from 'react';
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
import { setLocal } from '../Utils';
import { useWidth } from '../Hooks';
import MobileNav from './MobileNav';
import Signup from './Auth/Signup/index';

const App: React.FC = () => {
	const [width, isMobile] = useWidth();
	return (
		<ErrorContextProvider>
			<CurrentNavContextProvider>
				<NotificationContextProvider>
					<ChatContextProvider>
						<Switch>
							<Route
								exact
								path={'/signup/'}
								component={Signup}
							/>
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
								<MainContainer isMobile={isMobile}>
									<ProductionStateLabel>
										<span>Alpha</span>
									</ProductionStateLabel>
									{(isMobile && <MobileNav />) || (
										<MainPageHeader
											is={'MainPageHeader'}
											isMobile={isMobile}
										>
											<Header />
										</MainPageHeader>
									)}
									<MainPage
										isMobile={isMobile}
										id={'MainPage'}
									>
										{!isMobile && (
											<SideNavCol>
												<Nav />
											</SideNavCol>
										)}
										<MainView
											id={'MainView'}
											isMobile={isMobile}
										>
											<Main />
										</MainView>
									</MainPage>
									{!isMobile && <Messages />}
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
