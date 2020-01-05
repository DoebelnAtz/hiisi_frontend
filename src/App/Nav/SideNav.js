import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'

import IntraContext from "../Context/IntraContext";
import UserContext from "../Context/UserContext";
import { ToggleButton } from "../Components/Buttons/Toggle";
import {Profile, Logo, NavItem} from './NavItems'
import {makeRequest} from "../Api/Api";
import coalitionIcon from './navIcons/coalition.png'
import searchIcon from './navIcons/search.png'
import messageIcon from './navIcons/messages.png'
import notificationIcon from './navIcons/notifications_old.png'
import homeIcon from './navIcons/home.png'
import slotsIcon from './navIcons/slots.png'
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
            if (resp.status === 401)
            {
                console.log("failed");
                props.history.push('login');
                setCurrentUser({authorized: false});
                localStorage.clear();
            }
            else {
                localStorage.setItem('currentUser', JSON.stringify(resp.data));
                setCurrentUser(resp.data);
                if (localStorage.getItem('resp')) {
                    let token = JSON.parse(localStorage.getItem('resp'));
                    if (token.data.access_token) {
                        setIntra(true)
                    }
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
            <Logo currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'home'} name={'Home'} icon={homeIcon}/>
            <Profile currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
            />
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'slots'} name={'Slots'} icon={slotsIcon}/>
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
