import React from "react";
import { Link } from 'react-router-dom'
import './nav.css'

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

