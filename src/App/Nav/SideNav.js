import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import {Profile, Logo, ConnectToIntra, NavItem} from './NavItems'
import './nav.css'

const SideNav = (props) => {

    const [connected, setConnected] = useState(false);
    const [connectText, setConnectText] = useState('Connect to Intra');

    const checkAuth = () => {
        if (localStorage.getItem('token')) {
            console.log('authenticated');
            if (localStorage.getItem('resp')) {
                let token = JSON.parse(localStorage.getItem('resp'));
                if (token.data.access_token) {
                    setConnected(true);
                    setConnectText('Connected');
                }
            }
        }
        else{
            props.history.push('login')
        }
    };

    useEffect(() => {
        checkAuth() // eslint-disable-next-line
    }, []);

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
            <ConnectToIntra disabled={connected} text={connectText} setConnectedText={setConnectText}/>
        </div>
    );
};

export default withRouter(SideNav)
