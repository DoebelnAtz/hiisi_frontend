import React, { useContext, Fragment } from 'react';
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
	SearchLabel,
} from './Styles';
import SearchBar from './Search';
import Notifications from './Notifications';
import { useWidth } from '../../Hooks';
import { color } from '../../Styles/SharedStyles';

const Header: React.FC<RouteComponentProps<{}>> = ({ history }) => {
	const { state } = useContext(CurrentNavContext);
	const [width, isMobile] = useWidth();
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
			{!isMobile && (
				<SearchLabel>
					<span
						style={{
							color: color.siteBG1,
							margin: 'auto',
							userSelect: 'none',
						}}
					>
						Search
					</span>
					{/*<Notifications />*/}
					<SearchBar />
				</SearchLabel>
			)}
			<LogOutDiv onClick={requestLogout}>Logout</LogOutDiv>
		</HeaderDiv>
	);
};

export default withRouter(Header);
