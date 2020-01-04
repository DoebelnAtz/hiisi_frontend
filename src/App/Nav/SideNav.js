import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'

import IntraContext from "../Context/IntraContext";
import UserContext from "../Context/UserContext";
import { ToggleButton } from "../Components/Buttons/Toggle";
import {Profile, Logo, NavItem} from './NavItems'
import './nav.css'
import {makeRequest} from "../Api/Api";

const SideNav = (props) => {

    const [connected, setConnected] = useState(false);
    const [connectText, setConnectText] = useState('Connect to Intra');
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {intra, setIntra} = useContext(IntraContext);

    console.log(currentUser);

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
                     path={'message_home'} name={'Messages'} icon={'fas fa-comment-alt'}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'coalition'} name={'Coalition'} icon={'fas fa-shield-alt'}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'search'} name={'Search'} icon={'fas fa-search'}/>
            <ToggleButton connected={intra} setConnected={setIntra}/>
        </div>
    );
};

export default withRouter(SideNav)
