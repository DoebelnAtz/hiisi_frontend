import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'

import IntraContext from "../Context/IntraContext";
import UserContext from "../Context/UserContext";
import { ToggleButton } from "../Components/Buttons/Toggle";
import {Profile, Logo, NavItem, OpenHiveNav} from './NavItems'
import {makeRequest} from "../Api/Api";
import coalitionIcon from './navIcons/Shield.png'
import searchIcon from './navIcons/Search.png'
import messageIcon from './navIcons/Messages.png'
import notificationIcon from './navIcons/Notifications.png'
import homeIcon from './navIcons/Home.png'
import slotsIcon from './navIcons/Slots.png'
import logo from './navIcons/Logo.png'

import './nav.css'

const SideNav = (props) => {

    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {intra, setIntra} = useContext(IntraContext);

    const checkAuth = async () => {
        if (localStorage.getItem('token')) {
            let token = JSON.parse(localStorage.getItem('token')).token;

            let resp = await makeRequest('auth/user/', 'get', {}, {
                "Content-Type": "application/json",
                Authorization: "Token " + token,
            });
            
            localStorage.setItem('currentUser', JSON.stringify(resp.data));
            setCurrentUser(resp.data);
            if (localStorage.getItem('resp')) {
                let token = JSON.parse(localStorage.getItem('resp'));
                if (token.data.access_token) {
                    setIntra(true)
                }
            }

        }
        else {
            props.history.push('login')
        }
    };

    useEffect(() => {
        checkAuth();
    }, [localStorage.getItem('token')]);

    // When refreshing on smaller devices nav icons get buggy, no idea why
    // TODO: fix this bug

    return (
        <div className={'side_nav'}>
            <Logo currentNav={props.currentNav} icon={logo} setCurrentNav={props.setCurrentNav}/>
            <OpenHiveNav currentNav={props.currentNav} icon={homeIcon} setCurrentNav={props.setCurrentNav}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'blog'} name={'blog'} icon={homeIcon}/>
            <Profile currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
            />
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'slots'} name={'Slots'} icon={slotsIcon}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'boards'} name={'Boards'} icon={slotsIcon}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'notifications'} name={'Notifications'} icon={notificationIcon}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'message_home'} name={'Messages'} icon={messageIcon}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'coalition'} name={'Coalition'} icon={coalitionIcon}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'search'} name={'Search'} icon={searchIcon}/>
            <ToggleButton connected={intra} setConnected={setIntra}/>
        </div>
    );
};

export default withRouter(SideNav)
