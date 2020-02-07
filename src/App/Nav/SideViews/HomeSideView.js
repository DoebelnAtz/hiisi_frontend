import React, { useContext } from 'react'

import '../nav.css'
import {Link, withRouter} from "react-router-dom";

import HoveredNavContext from '../../../Context/HoveredNavContext'
import CurrentNavContext from "../../../Context/CurrentNavContext";

const HomeSideNav = (props) => {

    const { hoveredNav, setHoveredNav } = useContext(HoveredNavContext);
    const { currentNav, setCurrentNav} = useContext(CurrentNavContext);
    
    const handleDivClick = () => {
        setCurrentNav(hoveredNav);
        props.history.push('/' + hoveredNav);
    };

    return (
        <div>
            <div
                onClick={() => {setCurrentNav(hoveredNav); props.history.push('/openhive')}}
                onMouseOver={() => setHoveredNav('Open Hive')}
                onMouseLeave={() => setHoveredNav('')}
                className={`home_nav_text ${hoveredNav === 'Open Hive'
                    ? 'hovered' : currentNav === "Open Hive" ? 'active' : 'inactive'}`}
            >
                <Link
                    to={'/openhive'}
                    className={'home_nav_link'}
                    onClick={() => setCurrentNav('Open Hive')}
                >
                    Open Hive
                </Link>
            </div>
            <div
                onClick={handleDivClick}
                onMouseOver={() => setHoveredNav('blog')}
                onMouseLeave={() => setHoveredNav('')}
                className={`home_nav_text ${hoveredNav === 'blog'
                    ? 'hovered' : currentNav === "blog" ? 'active' : 'inactive'}`}
            >
                <Link
                    to={'/blog'}
                    className={'home_nav_link'}
                    onClick={() => setCurrentNav('blog')}
                >
                    Blog
                </Link>
            </div>
            <div
                onClick={handleDivClick}
                onMouseOver={() => setHoveredNav('profile')}
                onMouseLeave={() => setHoveredNav('')}
                className={`home_nav_text ${hoveredNav === 'profile'
                    ? 'hovered' : currentNav === "profile" ? 'active' : 'inactive'}`}
            >
                <Link

                    to={'/profile'}
                    className={'home_nav_link'}

                    onClick={() => setCurrentNav('profile')}
                >
                    Profile
                </Link>
            </div>
            <div
                onClick={handleDivClick}
                onMouseOver={() => setHoveredNav('resources')}
                onMouseLeave={() => setHoveredNav('')}
                className={`home_nav_text ${hoveredNav === "resources"
                    ? 'hovered' : currentNav === "resources" ? 'active' : 'inactive'}`}
            >
                <Link

                    to={'/resources'}
                    className={'home_nav_link'}
                    onClick={() => setCurrentNav('resources')}
                >
                    Resources
                </Link>
            </div>
            <div
                onClick={() => {setCurrentNav('messages');}}
                onMouseOver={() => setHoveredNav('messages')}
                onMouseLeave={() => setHoveredNav('')}
                className={`home_nav_text ${hoveredNav === "messages"
                    ? 'hovered' : currentNav === "messages" ? 'active' : 'inactive'}`}
            >
                <Link

                    to={props.location.pathname}
                    className={'home_nav_link'}
                    onClick={() => setCurrentNav('messages')}
                >
                    Messages
                </Link>
            </div>
            <div
                onClick={() => {setCurrentNav('search');}}
                onMouseOver={() => setHoveredNav('search')}
                onMouseLeave={() => setHoveredNav('')}
                className={`home_nav_text ${hoveredNav === "search"
                    ? 'hovered' : currentNav === "search" ? 'active' : 'inactive'}`}
            >
                <Link

                    to={props.location.pathname}
                    className={'home_nav_link'}
                    onClick={() => setCurrentNav('search')}
                >
                    Search
                </Link>
            </div>

        </div>
    )
};

export default withRouter(HomeSideNav)