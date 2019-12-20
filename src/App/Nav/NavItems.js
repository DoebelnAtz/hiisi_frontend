import React from "react";

import './nav.css'

export const Home = (props) => {
    console.log(props.stuff.currentNav);
    const setNavHome = () => {
        props.stuff.currentNav('home')
    };
    return (
        <div className={`row nav_item ${props.stuff.nav === 'home' ? 'active' : 'inactive'}`}
            onClick={setNavHome}
        >
            <i className="fas fa-home"> </i><span
            id={'home_nav'}
            className={'d-none d-md-block'}>
            Home</span>
        </div>
    )
};

export const Profile = (props) => {
    console.log(props.stuff);
    const setNavProfile = () => {
        props.stuff.currentNav('profile')
    };
    return (
        <div className={`row nav_item ${props.stuff.nav === 'profile' ? 'active' : 'inactive'}`}
             onClick={setNavProfile}
        >
            <i className="fas fa-user"> </i><span
            id={'profile_nav'}
            className={`d-none d-md-block`}>
            Profile</span>
        </div>
    )
};

export const Notification = (props) => {
    const setNavNotification = () => {
        props.stuff.currentNav('notifications')
    };
    return (
        <div className={`row nav_item ${props.stuff.nav === 'notifications' ? 'active' : 'inactive'}`}
             onClick={setNavNotification}
        >
            <i className="fas fa-bell"> </i><span id={'profile_notifications'} className={'d-none d-md-block'}>Notifications</span>
        </div>
    )
};


export const Messages = (props) => {
    const setNavMessages = () => {
        props.stuff.currentNav('messages')
    };
    return (
        <div className={`row nav_item ${props.stuff.nav === 'messages' ? 'active' : 'inactive'}`}
             onClick={setNavMessages}
        >
            <i className="fas fa-comment-alt"> </i><span id={'profile_messages'} className={'d-none d-md-block'}>Messages</span>
        </div>
    )
};

export const Coalition = (props) => {
    const setNavCoalition = () => {
        props.stuff.currentNav('coalition')
    };
    return (
        <div className={`row nav_item ${props.stuff.nav === 'coalition' ? 'active' : 'inactive'}`}
             onClick={setNavCoalition}
        >
            <i className="fas fa-shield-alt"> </i><span id={'profile_coalition'} className={'d-none d-md-block'}>Guards</span>
        </div>
    )
};

