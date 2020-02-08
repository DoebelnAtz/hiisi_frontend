import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import './base.css';
import { Logo } from './Nav/NavItems';
import logo from './Nav/navIcons/Logo6.png';
import { CurrentNavContext } from '../Context/CurrentNavContext';

const Header = (props) => {
	const { state, update } = useContext(CurrentNavContext);
	const requestLogout = () => {
		localStorage.clear();
		props.history.push('/login');
	};

	return (
		<div className={'d-flex header_nav'}>
			<div className={'logo_section'}>
				<Logo currentNav={state} icon={logo} setCurrentNav={update} />
			</div>
			<div id={'header_nav_title'}>{props.currentNav}</div>
			<div
				className={'ml-auto'}
				id={'header_logout'}
				onClick={requestLogout}
			>
				Logout
			</div>
		</div>
	);
};

export default withRouter(Header);
