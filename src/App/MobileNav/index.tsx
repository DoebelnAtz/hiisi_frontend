import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { MobileNavContainer, MobileNavItem } from './Styles';
import ForumIcon from '../../Assets/OpenHive2.png';
import codeIcon from '../../Assets/CodeIcon2.png';
import profileIcon from '../../Assets/Profile2.png';
import MessageIcon from '../../Assets/MessagesLG2.png';
import SearchIcon from '../../Assets/SearchLG.png';
import treeIcon from '../../Assets/Tree8.png';
import { CurrentNavContext } from '../../Context/CurrentNavContext';
const MobileNav: React.FC = () => {
	const history = useHistory();

	const handleNavClick = (link: string) => {
		history.push(link);
	};
	const { state: currentNav, update: setCurrentNav } = useContext(CurrentNavContext)
	return (
		<MobileNavContainer>
			<MobileNavItem
				src={codeIcon}
				selected={currentNav === 'Open Hive'}
				onClick={() => handleNavClick('/openhive')}
				alt={'Open Hive'}
			/>
			<MobileNavItem
				src={ForumIcon}
				selected={currentNav === 'forum'}
				onClick={() => handleNavClick('/forum')}
				alt={'Forum'}
			/>
			<MobileNavItem
				src={treeIcon}
				selected={currentNav === 'resources'}
				onClick={() => handleNavClick('/resources')}
				alt={'Resources'}
			/>
			<MobileNavItem
				src={profileIcon}
				selected={currentNav === 'profile'}
				onClick={() => handleNavClick('/profile')}
				alt={'Profile'}
			/>
			<MobileNavItem
				src={MessageIcon}
				onClick={() => handleNavClick('/messages')}
				alt={'Chat'}
			/>
		</MobileNavContainer>
	);
};

export default MobileNav;
