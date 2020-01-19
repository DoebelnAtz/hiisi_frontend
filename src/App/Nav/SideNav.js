import React, {useEffect, useContext, useState} from 'react'
import { withRouter } from 'react-router-dom'

import IntraContext from "../Context/IntraContext";
import UserContext from "../Context/UserContext";
import { ToggleButton } from "../Components/Buttons/Toggle";
import {Profile, Logo, NavItem, OpenHiveNav} from './NavItems'
import {makeRequest} from "../Api/Api";
import {getLocal, setLocal} from "../../utils/utils";

import coalitionIcon from './navIcons/Shield.png'
import searchIcon from './navIcons/Search.png'
import messageIcon from './navIcons/Messages.png'
import notificationIcon from './navIcons/Notifications.png'
import homeIcon from './navIcons/Home.png'
import slotsIcon from './navIcons/Slots.png'
import logo from './navIcons/Logo.png'

import './nav.css'
import NavIcons from "./NavIcons";
import NavDisplay from "./NavDisplay";

const SideNav = (props) => {

    const { setCurrentUser } = useContext(UserContext); // not really used bc problems with refreshing page
    const { intra, setIntra } = useContext(IntraContext);
    const [hoveredNav, setHoveredNav] = useState('');

    const checkAuth = async () => {
        let resp = await makeRequest(`users/me`, 'get');
        setLocal('currentUser', resp.data);
    };

    useEffect(() => {
        checkAuth();
    }, [JSON.stringify(getLocal('token')), JSON.stringify(getLocal('currentUser'))]);

    return (
        <div className={'side_nav'}>
            <Logo currentNav={props.currentNav} icon={logo} setCurrentNav={props.setCurrentNav}/>
            <div className={'row m-0'}>
            <div id={`nav_icons`} className={`${props.currentNav === 'messages' ? 'hidden' : '' } `}>
                <NavIcons intra={intra}
                          setHoveredNav={setHoveredNav}
                          hoveredNav={hoveredNav}
                          setCurrentNav={props.setCurrentNav}
                          currentNav={props.currentNav}
                          setIntra={setIntra}/>
            </div>
            <div id={'nav_view'}>
                <NavDisplay
                    setHoveredNav={setHoveredNav}
                    hoveredNav={hoveredNav}
                    setCurrentNav={props.setCurrentNav}
                    currentNav={props.currentNav}
                />
            </div>
            </div>
        </div>
    );
};

export default withRouter(SideNav)
