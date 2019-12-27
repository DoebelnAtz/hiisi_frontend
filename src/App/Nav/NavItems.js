import React from "react";
import { Link } from 'react-router-dom'
import './nav.css'

export const Logo = (props) => {
    const setNavHome = () => {
        props.stuff.currentNav('home')
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

export const Home = (props) => {
    const setNavHome = () => {
        props.stuff.currentNav('home')
    };
    return (
        <Link
            to={'/home'}
            className={`row nav_item ${props.stuff.nav === 'home' ? 'active' : 'inactive'}`}
            onClick={setNavHome}
        >
            <i className="fas fa-home"> </i><span
            id={'home_nav'}
            className={'d-none d-md-block'}>
            Home</span>
        </Link>
    )
};

export const Profile = (props) => {
    const setNavProfile = () => {
        props.stuff.currentNav('profile')
    };
    return (
        <Link
            to={'/profile'}
            className={`row nav_item ${props.stuff.nav === 'profile' ? 'active' : 'inactive'}`}
            onClick={setNavProfile}
        >
            <i className="fas fa-user"> </i><span
            id={'profile_nav'}
            className={`d-none d-md-block`}>
            Profile</span>
        </Link>
    )
};



export const Notification = (props) => {
    const setNavNotification = () => {
        props.stuff.currentNav('notifications')
    };
    return (
        <Link
            to={'/'}
            className={`row nav_item ${props.stuff.nav === 'notifications' ? 'active' : 'inactive'}`}
            onClick={setNavNotification}
        >
            <i className="fas fa-bell"> </i><span id={'profile_notifications'} className={'d-none d-md-block'}>Notifications</span>
        </Link>
    )
};


export const Messages = (props) => {
    const setNavMessages = () => {
        props.stuff.currentNav('messages')
    };
    return (
        <Link
            to={'/'}
            className={`row nav_item ${props.stuff.nav === 'messages' ? 'active' : 'inactive'}`}
            onClick={setNavMessages}
        >
            <i className="fas fa-comment-alt"> </i><span id={'profile_messages'} className={'d-none d-md-block'}>Messages</span>
        </Link>
    )
};

export const Coalition = (props) => {

    const setNavCoalition = () => {
        props.stuff.currentNav('coalition')
    };

    return (
        <Link
            to={'/'}
            className={`row nav_item ${props.stuff.nav === 'coalition' ? 'active' : 'inactive'}`}
            onClick={setNavCoalition}
        >
            <i className="fas fa-shield-alt"> </i><span id={'profile_coalition'} className={'d-none d-md-block'}>Guards</span>
        </Link>
    )
};

export const Search = (props) => {

    const setNavSearch = () => {
        props.stuff.currentNav('search')
    };

    return (
        <Link
            to={'/search'}
            className={`row nav_item ${props.stuff.nav === 'search' ? 'active' : 'inactive'}`}
            onClick={setNavSearch}
        >
            <i className="fas fa-search"></i>
            <span id={'profile_coalition'} className={'d-none d-md-block'}>Search</span>
        </Link>
    )
};

export const ConnectToIntra = (props) => {

      return (
          <a
              href="https://api.intra.42.fr/oauth/authorize?client_id=520cf2ed25a517e352458db17ec06a2f0791b65cf99fc851ef0dea579908f158&scope=public%20projects%20profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000/redirect&response_type=code"
          >
          <button disabled={props.disabled}>
              {props.text}
          </button></a>
      )
};


