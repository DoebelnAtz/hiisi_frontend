import React, { useContext } from 'react';
import HomeSideView from './SideViews/HomeSideView';
import MessageSideView from './SideViews/MessageSideView';
import { CurrentNavContext } from '../../Context/CurrentNavContext';
import SearchSideView from './SideViews/SearchSideView';

const NavDisplay: React.FC = () => {
	const { state: currentNav } = useContext(CurrentNavContext);
	// TODO: fix this mess..
	const selectNav = (nav: string) => {
		switch (nav) {
			case 'messages':
				return <MessageSideView />;
			case 'search':
				return <SearchSideView />;
			default:
				return <HomeSideView />;
		}
	};

	return selectNav(currentNav);
};

export default NavDisplay;
