import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

import { CurrentNavContext } from '../../Context/CurrentNavContext';
import HoveredNavContext from '../../Context/HoveredNavContext';

type LogoProps = {
	icon: string;
	setCurrentNav: any;
};

type NavItemProps = {
	icon: string;
	path?: string;
	name?: string;
};

export const Logo: React.FC<LogoProps> = ({ icon, setCurrentNav }) => {
	const setNavHome = () => {
		setCurrentNav('blog');
	};
	return (
		<Link to={'/openhive'} className={'nav_logo'} onClick={setNavHome}>
			<img className={'logo_icon'} src={icon} alt={'logo'} />
			<span className={'nav_logo_text'}>Hivemind</span>
		</Link>
	);
};

export const OpenHiveNav: React.FC<NavItemProps> = ({ icon }) => {
	const { state: currentNav, update: setCurrentNav } = useContext(
		CurrentNavContext,
	);
	const { hoveredNav, setHoveredNav } = useContext<any>(HoveredNavContext);
	return (
		<Link
			onMouseOver={() => setHoveredNav('Open Hive')}
			to={`/openhive`}
			className={`row_div nav_item ${
				hoveredNav === 'Open Hive'
					? 'hovered'
					: hoveredNav === 'Open Hive'
					? 'hovered'
					: currentNav === 'Open Hive'
					? 'active'
					: 'inactive'
			}`}
			onClick={() => setCurrentNav('Open Hive')}
		>
			<img className={'nav_icon'} src={icon} alt={'OpenHive_icon'} />
		</Link>
	);
};

export const NavItem: React.FC<NavItemProps> = ({ path, name, icon }) => {
	const { state: currentNav, update: setCurrentNav } = useContext(
		CurrentNavContext,
	);
	const { hoveredNav, setHoveredNav } = useContext<any>(HoveredNavContext);

	return (
		<Link
			onMouseOver={() => setHoveredNav(name?.toLowerCase())}
			onMouseLeave={() => setHoveredNav('')}
			to={`${path}`}
			className={`row nav_item ${
				hoveredNav === name?.toLowerCase()
					? 'hovered'
					: currentNav === name?.toLowerCase()
					? 'active'
					: 'inactive'
			}`}
			onClick={() => {
				name && setCurrentNav(name.toLowerCase());
			}}
		>
			<img className={'nav_icon'} src={icon} alt={`${name}_icon`} />
		</Link>
	);
};
