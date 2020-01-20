import React, {useEffect, useContext, useState} from 'react'
import { withRouter } from 'react-router-dom'

import IntraContext from "../../Context/IntraContext";
import { Logo } from './NavItems'
import {makeRequest} from "../Api/Api";
import {getLocal, setLocal} from "../../utils/utils";

import logo from './navIcons/Logo.png'
import HoveredNavContext from '../../Context/HoveredNavContext'
import './nav.css'
import NavIcons from "./NavIcons";
import NavDisplay from "./NavDisplay";
import CurrentNavContext from "../../Context/CurrentNavContext";

const SideNav = () => {

    const { intra, setIntra } = useContext(IntraContext);
    const { currentNav, setCurrentNav} = useContext(CurrentNavContext);

    const [hoveredNav, setHoveredNav] = useState('');
    const checkAuth = async () => {
        let resp = await makeRequest(`users/me`, 'get');
        setLocal('currentUser', resp.data);
    };

    useEffect(() => {
        checkAuth();
    }, [JSON.stringify(getLocal('token')), JSON.stringify(getLocal('currentUser'))]);

    return (
        <HoveredNavContext.Provider value={{hoveredNav, setHoveredNav}}>
        <div className={'side_nav'}>
            <div className={'row m-0'}>
            <div id={`nav_icons`} className={`${currentNav === 'messages' ? 'hidden' : '' } `}>
                <NavIcons/>
            </div>
            <div id={'nav_view'}>
                <NavDisplay
                />
            </div>
            </div>
        </div>
        </HoveredNavContext.Provider>
    );
};

export default withRouter(SideNav)
