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
              href="https://api.intra.42.fr/oauth/authorize?client_id=520cf2ed25a517e352458db17ec06a2f0791b65cf99fc851ef0dea579908f158&scope=public%20projects%20profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000/redirect&response_type=code"
          >
          <Button disabled={props.disabled}
                  onClick={() => props.setConnectedText('Connecting...')}
                  text={props.text}
          >

          </Button>
          </a>
      )
};


