import React, { useContext, useEffect } from 'react';
import { SideNavDiv } from './Styles';
import NavItem from './NavItem';
import openHiveIcon from '../../Assets/OpenHive.png';
import profileIcon from '../../Assets/Profile2.png';
import treeIcon from '../../Assets/Tree8.png';
import { makeRequest } from '../../Api';
import { getLocal, setLocal } from '../../Utils';

const SideNav: React.FC = () => {
	const checkAuth = async () => {
		let resp = await makeRequest(`users/me`, 'get');
		setLocal('currentUser', resp.data);
	};

	useEffect(() => {
		checkAuth();
	}, [
		JSON.stringify(getLocal('token')),
		JSON.stringify(getLocal('currentUser')),
	]);

	return (
		<SideNavDiv>
			<NavItem
				icon={openHiveIcon}
				title={'Open Hive'}
				link={'/openhive'}
			/>
			<NavItem icon={openHiveIcon} title={'Forum'} link={'/forum'} />
			<NavItem icon={treeIcon} title={'Resources'} link={'/resources'} />
			<NavItem icon={profileIcon} title={'Profile'} link={'/profile'} />
		</SideNavDiv>
	);
};

export default SideNav;
