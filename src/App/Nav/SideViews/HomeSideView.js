import React, { useEffect, useContext } from 'react'

import '../nav.css'
import {Link, withRouter} from "react-router-dom";

const HomeSideNav = (props) => {

    const handleDivClick = () => {
        props.setCurrentNav(props.hoveredNav);
        props.history.push(props.hoveredNav);
    };

    return (
        <div>
            <div
                onClick={() => {props.setCurrentNav(props.hoveredNav); props.history.push('openhive')}}
                onMouseOver={() => props.setHoveredNav('Open Hive')}
                onMouseLeave={() => props.setHoveredNav('')}
                className={`home_nav_text ${props.hoveredNav === 'Open Hive'
                    ? 'hovered' : props.currentNav === "Open Hive" ? 'active' : 'inactive'}`}
            >
                <Link
                    to={'/openhive'}
                    className={'home_nav_link'}
                    onClick={() => props.setCurrentNav('Open Hive')}
                >
                    Open Hive
                </Link>
            </div>
            <div
                onClick={handleDivClick}
                onMouseOver={() => props.setHoveredNav('blog')}
                onMouseLeave={() => props.setHoveredNav('')}
                className={`home_nav_text ${props.hoveredNav === 'blog'
                    ? 'hovered' : props.currentNav === "blog" ? 'active' : 'inactive'}`}
            >
                <Link
                    to={'/blog'}
                    className={'home_nav_link'}
                    onClick={() => props.setCurrentNav('blog')}
                >
                    Blog
                </Link>
            </div>
            <div
                onClick={handleDivClick}
                onMouseOver={() => props.setHoveredNav('profile')}
                onMouseLeave={() => props.setHoveredNav('')}
                className={`home_nav_text ${props.hoveredNav === 'profile'
                    ? 'hovered' : props.currentNav === "profile" ? 'active' : 'inactive'}`}
            >
                <Link

                    to={'/profile'}
                    className={'home_nav_link'}

                    onClick={() => props.setCurrentNav('profile')}
                >
                    Profile
                </Link>
            </div>
            <div
                onClick={handleDivClick}
                onMouseOver={() => props.setHoveredNav('boards')}
                onMouseLeave={() => props.setHoveredNav('')}
                className={`home_nav_text ${props.hoveredNav === 'boards'
                    ? 'hovered' : props.currentNav === "boards" ? 'active' : 'inactive'}`}
            >
                <Link

                    to={'/boards'}
                    className={'home_nav_link'}
                    onClick={() => props.setCurrentNav('boards')}
                >
                    Boards
                </Link>
            </div>
            <div
                onClick={() => {props.setCurrentNav('messages'); props.history.push('message_home')}}
                onMouseOver={() => props.setHoveredNav('messages')}
                onMouseLeave={() => props.setHoveredNav('')}
                className={`home_nav_text ${props.hoveredNav === "messages"
                    ? 'hovered' : props.currentNav === "messages" ? 'active' : 'inactive'}`}
            >
                <Link

                    to={'/message_home'}
                    className={'home_nav_link'}
                    onClick={() => props.setCurrentNav('messages')}
                >
                    Messages
                </Link>
            </div>
            <div
                onClick={handleDivClick}
                onMouseOver={() => props.setHoveredNav('search')}
                onMouseLeave={() => props.setHoveredNav('')}
                className={`home_nav_text ${props.hoveredNav === "search"
                    ? 'hovered' : props.currentNav === "search" ? 'active' : 'inactive'}`}
            >
                <Link

                    to={'/search'}
                    className={'home_nav_link'}
                    onClick={() => props.setCurrentNav('search')}
                >
                    Search
                </Link>
            </div>
        </div>
    )
}

export default withRouter(HomeSideNav)
