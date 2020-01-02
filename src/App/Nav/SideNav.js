import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { ToggleButton } from "../Components/Buttons/Toggle";
import {Profile, Logo, NavItem} from './NavItems'
import './nav.css'
import {makeRequest} from "../Api/Api";

const SideNav = (props) => {

    const [connected, setConnected] = useState(false);
    const [connectText, setConnectText] = useState('Connect to Intra');

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
                localStorage.clear();
            }
            else {
                localStorage.setItem('currentUser', JSON.stringify(resp.data))
                if (localStorage.getItem('resp')) {
                    let token = JSON.parse(localStorage.getItem('resp'));
                    if (token.data.access_token) {
                        setConnected(true);
                        setConnectText('Connected');
                    }
                }
            }
        }
        else{
            props.history.push('login')
        }
    };
    checkAuth();
    // useEffect(() => {
    //     checkAuth() // eslint-disable-next-line
    // }, []);

    return (
        <div className={'side_nav'}>
            <Logo currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'home'} name={'Home'} icon={'fas fa-home'}/>
            <Profile currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
            />
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'slots'} name={'Slots'} icon={'fas fa-chalkboard-teacher'}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'notifications'} name={'Notifications'} icon={'fas fa-bell'}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'messages'} name={'Messages'} icon={'fas fa-comment-alt'}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'coalition'} name={'Coalition'} icon={'fas fa-shield-alt'}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'search'} name={'Search'} icon={'fas fa-search'}/>
            <ToggleButton connected={connected} setConnected={setConnected}/>
        </div>
    );
};

export default withRouter(SideNav)
