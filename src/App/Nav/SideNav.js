import React, { useState, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import {Profile, Logo, ConnectToIntra, NavItem} from './NavItems'
import './nav.css'
import  ProfileOptions from './ProfileOptions/ProfileOptions'

const SideNav = (props) => {

    const [connected, setConnected] = useState(false);
    const [connectText, setConnectText] = useState('Connect to Intra');
    const [currentNav, setCurrentNav] = useState('home');

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
        checkAuth()
    }, []);

    return (
        <div className={'side_nav'}>
            <Logo currentNav={currentNav} setCurrentNav={setCurrentNav}/>
            <NavItem currentNav={currentNav} setCurrentNav={setCurrentNav}
                     path={'home'} name={'home'} icon={'fas fa-home'}/>
            <Profile currentNav={currentNav} setCurrentNav={setCurrentNav}/>
            <Route exact path={['/profile', '/profile/slots']}>
                <ProfileOptions currentNav={currentNav} setCurrentNav={setCurrentNav}/>
            </Route>
            <NavItem currentNav={currentNav} setCurrentNav={setCurrentNav}
                     path={'notifications'} name={'notifications'} icon={'fas fa-bell'}/>
            <NavItem currentNav={currentNav} setCurrentNav={setCurrentNav}
                     path={'messages'} name={'messages'} icon={'fas fa-comment-alt'}/>
            <NavItem currentNav={currentNav} setCurrentNav={setCurrentNav}
                     path={'coalition'} name={'coalition'} icon={'fas fa-shield-alt'}/>
            <NavItem currentNav={currentNav} setCurrentNav={setCurrentNav}
                     path={'search'} name={'search'} icon={'fas fa-search'}/>
            <ConnectToIntra disabled={connected} text={connectText} setConnectedText={setConnectText}/>
        </div>
    );
};

export default withRouter(SideNav)
