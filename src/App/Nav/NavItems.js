import React from "react";
import { Link } from 'react-router-dom'
import './nav.css'

import profileIcon from './navIcons/Profile1.png'
import Button from '../Components/Buttons/Button'

export const Logo = (props) => {
    const setNavHome = () => {
        props.setCurrentNav('Open Hive')
    };
    return (
        <Link
            to={'/blog'}
            className={'row nav_item nav_logo'}
            onClick={setNavHome}
        >
            <img className={"nav_icon"} src={props.icon} alt={'blog_icon'}/><span
            id={'home_nav'}
            className={'nav_item_text'}>
            Hivemind</span>
        </Link>
    )
};


export const OpenHiveNav = (props) => {
    return (
        <Link
            onMouseOver={() => props.setHoveredNav('Open Hive')}
            to={`/openhive`}
            className={`row nav_item ${props.hoveredNav === 'Open Hive'
                ? 'hovered' : props.hoveredNav === "Open Hive" ? 'hovered' : props.currentNav === "Open Hive" ? 'active' : 'inactive'}`}
            onClick={() => props.setCurrentNav("Open Hive")}
        >
            <img className={'nav_icon'} src={props.icon} alt={'OpenHive_icon'}/>
        </Link>
    )
}

export const NavItem = (props) => {
    return (
        <Link
            onMouseOver={() => props.setHoveredNav(props.name.toLowerCase())}
            onMouseLeave={() => props.setHoveredNav('')}
            to={`/${props.path}`}
            className={`row nav_item ${props.hoveredNav === props.name.toLowerCase()
                ? 'hovered' : props.currentNav === props.name.toLowerCase()
                    ? 'active' : 'inactive'}`}
            onClick={() => props.setCurrentNav(props.name.toLowerCase())}
        >
            <img className={'nav_icon'} src={props.icon}  alt={`${props.name}_icon`}/>
        </Link>
    )
};

export const Profile = (props) => {
    const setNavProfile = () => {
        props.setCurrentNav('profile')
    };
    return (
        <Link
            onMouseOver={() => props.setHoveredNav('profile')}
            onMouseLeave={() => props.setHoveredNav('')}
            to={'/profile'}
            className={`row nav_item ${props.hoveredNav === 'profile'
                ? 'hovered' : props.currentNav === 'profile' ? 'active' : 'inactive'}`}
            onClick={setNavProfile}
        >
            <img className={'nav_icon'} src={profileIcon}  alt={'profile_icon'}/>
        </Link>
    )
};

export const ConnectToIntra = (props) => {

      return (
          <a
          >
          <Button disabled={props.disabled}
                  onClick={() => props.setConnectedText('Connecting...')}
                  text={props.text}
          >
          </Button>
          </a>
      )
};


