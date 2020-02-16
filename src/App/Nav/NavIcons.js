import searchIcon from './navIcons/Search2.png';
import messageIcon from './navIcons/Messages2.png';
import openHiveIcon from './navIcons/OpenHive.png';

import profileIcon from './navIcons/Profile.png';
import treeIcon from './navIcons/Tree7.png';

import { NavItem, OpenHiveNav } from './NavItems';
import React from 'react';
import { withRouter } from 'react-router-dom';

const NavIcons = (props) => {
	return (
		<div className={'side_nav'}>
			<OpenHiveNav icon={openHiveIcon} />
			<NavItem path={'/forum'} name={'forum'} icon={openHiveIcon} />
			<NavItem path={'/profile'} name={'Profile'} icon={profileIcon} />
			<NavItem path={'/resources'} name={'Resources'} icon={treeIcon} />
			<NavItem
				path={props.location.pathname}
				name={'Messages'}
				icon={messageIcon}
			/>
			<NavItem
				path={props.location.pathname}
				name={'Search'}
				icon={searchIcon}
			/>
		</div>
	);
};

export default withRouter(NavIcons);
