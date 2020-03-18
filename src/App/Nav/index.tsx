import React, { useContext, useEffect } from 'react';
import { SideNavDiv } from './Styles';
import NavItem from './NavItem';
import openHiveIcon from '../../Assets/OpenHive2.png';
import codeIcon from '../../Assets/CodeIcon2.png';
import profileIcon from '../../Assets/Profile2.png';
import treeIcon from '../../Assets/Tree8.png';
import { makeRequest } from '../../Api';
import { getLocal, setLocal } from '../../Utils';

const SideNav: React.FC = () => {
	const checkAuth = async () => {
		let resp = await makeRequest(`users/me`, 'get');
	};

	useEffect(() => {
		checkAuth();
	}, [
		JSON.stringify(getLocal('token')),
	]);

	return (
		<SideNavDiv>
			<NavItem icon={treeIcon} title={'Resources'} link={'/resources'} />
			<NavItem icon={codeIcon} title={'Open Hive'} link={'/openhive'} />
			<NavItem icon={openHiveIcon} title={'Forum'} link={'/forum'} />
			<NavItem icon={profileIcon} title={'Profile'} link={'/profile'} />
		</SideNavDiv>
	);
};

export default SideNav;
