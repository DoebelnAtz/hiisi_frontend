import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import '../base.css';
import logo from '../../Assets/Logo6.png';
import { CurrentNavContext } from '../../Context/CurrentNavContext';
import { capitalizeFirst } from '../../Utils';
import { RouteComponentProps } from '../../Types';
import {
	HeaderDiv,
	LogoDiv,
	LogOutDiv,
	NavTitleDiv,
	Logo,
	SiteTitle,
} from './Styles';
import SearchBar from './Search';
import Notifications from './Notifications';

const Header: React.FC<RouteComponentProps<{}>> = ({ history }) => {
	const { state } = useContext(CurrentNavContext);

	const requestLogout = () => {
		localStorage.clear();
		history.push('/login');
	};

	return (
		<HeaderDiv>
			<LogoDiv>
				<Logo src={logo} alt={'logo'} />
				<SiteTitle>Hivemind</SiteTitle>
			</LogoDiv>
			<NavTitleDiv>{capitalizeFirst(state)}</NavTitleDiv>
			<Notifications />
			<SearchBar />
			<LogOutDiv onClick={requestLogout}>Logout</LogOutDiv>
		</HeaderDiv>
	);
};

export default withRouter(Header);
