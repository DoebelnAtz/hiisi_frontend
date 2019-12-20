import React from "react";

export const Profile = (props) => {
    console.log(props.stuff);
    return (
        <div className={'row nav_item'}>
            <i className="fas fa-user"></i><span
            id={'profile_nav'}
            className={`d-none d-md-block ${props.stuff.nav === 'profile' ? 'active' : 'inactive'}`}>
            Profile</span>
        </div>
    )
};

export const Notification = (props) => {
    return (
        <div className={'row nav_item'}>
            <i className="fas fa-bell"></i><span id={'profile_notifications'} className={'d-none d-md-block'}>Notifications</span>
        </div>
    )
};


export const Messages = (props) => {
    return (
        <div className={'row nav_item'}>
            <i className="fas fa-comment-alt"></i><span id={'profile_messages'} className={'d-none d-md-block'}>Messages</span>
        </div>
    )
};

export const Coalition = (props) => {
    return (
        <div className={'row nav_item'}>
            <i className="fas fa-shield-alt"></i><span id={'profile_coalition'} className={'d-none d-md-block'}>Guards</span>
        </div>
    )
};

