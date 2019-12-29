import React from "react";
import { Link } from 'react-router-dom'
import './nav.css'

import Button from '../Components/Buttons/Button'

export const Logo = (props) => {
    const setNavHome = () => {
        props.setCurrentNav('home')
    };
    return (
        <Link
            to={'/home'}
            className={'row nav_item nav_logo'}
            onClick={setNavHome}
        >
            <i className="fas fa-home"> </i><span
            id={'home_nav'}
            className={'d-none d-md-block'}>
            Hivemind</span>
        </Link>
    )
};

export const NavItem = (props) => {
    return (
        <Link
            to={`/${props.path}`}
            className={`row nav_item ${props.currentNav === props.path ? 'active' : 'inactive'}`}
            onClick={() => props.setCurrentNav(props.path)}
        >
            <i className={props.icon}> </i><span
            id={`${props.name}_nav`}
            className={'d-none d-md-block'}>
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
            <i className="fas fa-user"> </i><span
            id={'profile_nav'}
            className={`d-none d-md-block`}>
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


