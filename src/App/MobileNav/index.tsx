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
				selected={history.location.pathname === '/resources'}
				onClick={() => handleNavClick('/resources')}
			>
				<img src={treeIcon}
				alt={'resources'}/>
			</MobileNavItem>
			<MobileNavItem
				selected={history.location.pathname === '/openhive' || history.location.pathname.includes('/projects')}
				onClick={() => handleNavClick('/openhive')}
			>
				<img src={codeIcon}
				alt={'Open Hive'}/>
			</MobileNavItem>
			<MobileNavItem

				selected={history.location.pathname === '/forum'}
				onClick={() => handleNavClick('/forum')}

			>
				<img src={ForumIcon}
				alt={'forum'}/>
			</MobileNavItem>
			<MobileNavItem
				selected={history.location.pathname === '/user'}
				onClick={() => handleNavClick('/user')}
			>
				<img src={profileIcon}
				alt={'Open Hive'}/>
			</MobileNavItem>
			<MobileNavItem
				selected={history.location.pathname === '/messages'}
				onClick={() => handleNavClick('/messages')}
			>
				<img src={MessageIcon}
				alt={'Messages'}/>
			</MobileNavItem>
		</MobileNavContainer>
	);
};

export default MobileNav;
