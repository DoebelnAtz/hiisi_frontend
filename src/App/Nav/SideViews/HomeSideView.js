import React, { useContext } from 'react';

import '../nav.css';
import { Link, withRouter } from 'react-router-dom';

import HoveredNavContext from '../../../Context/HoveredNavContext';
import { CurrentNavContext } from '../../../Context/CurrentNavContext';

const HomeSideNav = (props) => {
	const { hoveredNav, setHoveredNav } = useContext(HoveredNavContext);
	const { state, update } = useContext(CurrentNavContext);

	const handleDivClick = () => {
		update(hoveredNav);
		props.history.push('/' + hoveredNav);
	};

	return (
		<div>
			<div
				onClick={() => {
					update(hoveredNav);
					props.history.push('/openhive');
				}}
				onMouseOver={() => setHoveredNav('Open Hive')}
				onMouseLeave={() => setHoveredNav('')}
				className={`home_nav_text ${
					hoveredNav === 'Open Hive'
						? 'hovered'
						: state === 'Open Hive'
						? 'active'
						: 'inactive'
				}`}
			>
				<Link
					to={'/openhive'}
					className={'home_nav_link'}
					onClick={() => update('Open Hive')}
				>
					Open Hive
				</Link>
			</div>
			<div
				onClick={handleDivClick}
				onMouseOver={() => setHoveredNav('forum')}
				onMouseLeave={() => setHoveredNav('')}
				className={`home_nav_text ${
					hoveredNav === 'forum'
						? 'hovered'
						: state === 'forum'
						? 'active'
						: 'inactive'
				}`}
			>
				<Link
					to={'/forum'}
					className={'home_nav_link'}
					onClick={() => update('forum')}
				>
					Forum
				</Link>
			</div>
			<div
				onClick={handleDivClick}
				onMouseOver={() => setHoveredNav('profile')}
				onMouseLeave={() => setHoveredNav('')}
				className={`home_nav_text ${
					hoveredNav === 'profile'
						? 'hovered'
						: state === 'profile'
						? 'active'
						: 'inactive'
				}`}
			>
				<Link
					to={'/profile'}
					className={'home_nav_link'}
					onClick={() => update('profile')}
				>
					Profile
				</Link>
			</div>
			<div
				onClick={handleDivClick}
				onMouseOver={() => setHoveredNav('resources')}
				onMouseLeave={() => setHoveredNav('')}
				className={`home_nav_text ${
					hoveredNav === 'resources'
						? 'hovered'
						: state === 'resources'
						? 'active'
						: 'inactive'
				}`}
			>
				<Link
					to={'/resources'}
					className={'home_nav_link'}
					onClick={() => update('resources')}
				>
					Resources
				</Link>
			</div>
			<div
				onClick={() => {
					update('messages');
				}}
				onMouseOver={() => setHoveredNav('messages')}
				onMouseLeave={() => setHoveredNav('')}
				className={`home_nav_text ${
					hoveredNav === 'messages'
						? 'hovered'
						: state === 'messages'
						? 'active'
						: 'inactive'
				}`}
			>
				<Link
					to={props.location.pathname}
					className={'home_nav_link'}
					onClick={() => update('messages')}
				>
					Messages
				</Link>
			</div>
			<div
				onClick={() => {
					update('search');
				}}
				onMouseOver={() => setHoveredNav('search')}
				onMouseLeave={() => setHoveredNav('')}
				className={`home_nav_text ${
					hoveredNav === 'search'
						? 'hovered'
						: state === 'search'
						? 'active'
						: 'inactive'
				}`}
			>
				<Link
					to={props.location.pathname}
					className={'home_nav_link'}
					onClick={() => update('search')}
				>
					Search
				</Link>
			</div>
		</div>
	);
};

export default withRouter(HomeSideNav);
