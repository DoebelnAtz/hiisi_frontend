import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import '../base.css';
import { Logo } from '../Nav/NavItems';
import logo from '../Nav/navIcons/Logo6.png';
import { CurrentNavContext } from '../../Context/CurrentNavContext';
import { capitalizeFirst } from '../../utils/utils';
import { RouteComponentProps } from '../../Types';
import { HeaderDiv, LogoDiv, LogOutDiv, NavTitleDiv } from './Styles';

const Header: React.FC<RouteComponentProps<{}>> = ({ history }) => {
	const { state, update } = useContext(CurrentNavContext);

	const requestLogout = () => {
		localStorage.clear();
		history.push('/login');
	};

	return (
		<HeaderDiv>
			<LogoDiv>
				<Logo currentNav={state} icon={logo} setCurrentNav={update} />
			</LogoDiv>
			<NavTitleDiv>{capitalizeFirst(state)}</NavTitleDiv>
			<LogOutDiv onClick={requestLogout}>Logout</LogOutDiv>
		</HeaderDiv>
	);
};

export default withRouter(Header);
