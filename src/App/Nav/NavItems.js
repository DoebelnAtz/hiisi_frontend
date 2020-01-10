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
            className={'d-none d-md-block nav_item_text'}>
            Hivemind</span>
        </Link>
    )
};


export const OpenHiveNav = (props) => {
    return (
        <Link
            to={`/openhive`}
            className={`row nav_item ${props.currentNav === "Open Hive" ? 'active' : 'inactive'}`}
            onClick={() => props.setCurrentNav("Open Hive")}
        >
            <img className={'nav_icon'} src={props.icon} alt={'OpenHive_icon'}/><span
            id={`$open_hive_nav`}
            className={'nav_item_text d-none d-md-block'}>
            Open Hive</span>
        </Link>
    )
}

export const NavItem = (props) => {
    return (
        <Link
            to={`/${props.path}`}
            className={`row nav_item ${props.currentNav === props.path ? 'active' : 'inactive'}`}
            onClick={() => props.setCurrentNav(props.path)}
        >
            <img className={'nav_icon'} src={props.icon}  alt={`${props.name}_icon`}/><span
            id={`${props.name}_nav`}
            className={'nav_item_text d-none d-md-block'}>
            {props.name}</span>
        </Link>
    )
};

export const Profile = (props) => {
    const setNavProfile = () => {
        props.setCurrentNav('profile')
    };
    return (
        <Link
            to={'/profile'}
            className={`row nav_item ${props.currentNav === 'profile' ? 'active' : 'inactive'}`}
            onClick={setNavProfile}
        >
            <img className={'nav_icon'} src={profileIcon}  alt={'profile_icon'}/><span
            id={'profile_nav'}
            className={`d-none d-md-block nav_item_text`}>
            Profile</span>
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


