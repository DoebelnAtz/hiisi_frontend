import React, { useState, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import {Profile, Logo, ConnectToIntra, NavItem} from './NavItems'
import './nav.css'
import  ProfileOptions from './ProfileOptions/ProfileOptions'

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
                     path={'home'} name={'home'} icon={'fas fa-home'}/>
            <Profile currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}/>
            <Route exact path={['/profile', '/profile/slots']}>
                <ProfileOptions currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}/>
            </Route>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'notifications'} name={'notifications'} icon={'fas fa-bell'}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'messages'} name={'messages'} icon={'fas fa-comment-alt'}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'coalition'} name={'coalition'} icon={'fas fa-shield-alt'}/>
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     path={'search'} name={'search'} icon={'fas fa-search'}/>
            <ConnectToIntra disabled={connected} text={connectText} setConnectedText={setConnectText}/>
        </div>
    );
};

export default withRouter(SideNav)
