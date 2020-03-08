import React from 'react';
import { useHistory } from 'react-router-dom';
import { MobileNavContainer, MobileNavItem } from './Styles';
import ForumIcon from '../../Assets/OpenHive2.png';
import codeIcon from '../../Assets/CodeIcon2.png';
import profileIcon from '../../Assets/Profile2.png';
import MessageIcon from '../../Assets/MessagesLG2.png';
import SearchIcon from '../../Assets/SearchLG.png';
import treeIcon from '../../Assets/Tree8.png';
const MobileNav: React.FC = () => {
	const history = useHistory();

	const handleNavClick = (link: string) => {
		history.push(link);
	};

	return (
		<MobileNavContainer>
			<MobileNavItem
				src={codeIcon}
				onClick={() => handleNavClick('/openhive')}
				alt={'Open Hive'}
			/>
			<MobileNavItem
				src={ForumIcon}
				onClick={() => handleNavClick('/forum')}
				alt={'Forum'}
			/>
			<MobileNavItem
				src={treeIcon}
				onClick={() => handleNavClick('/resources')}
				alt={'Resources'}
			/>
			<MobileNavItem
				src={profileIcon}
				onClick={() => handleNavClick('/profile')}
				alt={'Profile'}
			/>
			<MobileNavItem
				src={MessageIcon}
				onClick={() => handleNavClick('/openhive')}
				alt={'Chat'}
			/>
			<MobileNavItem
				src={SearchIcon}
				onClick={() => handleNavClick('/openhive')}
				alt={'Search'}
			/>
		</MobileNavContainer>
	);
};

export default MobileNav;
