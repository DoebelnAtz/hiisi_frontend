import coalitionIcon from './navIcons/Shield.png'
import searchIcon from './navIcons/Search2.png'
import messageIcon from './navIcons/Messages2.png'
import openHiveIcon from './navIcons/OpenHive.png'
import notificationIcon from './navIcons/Notifications.png'
import homeIcon from './navIcons/Home.png'
import slotsIcon from './navIcons/Slots.png'
import profileIcon from './navIcons/Profile.png'

import { NavItem, OpenHiveNav } from "./NavItems";
import {ToggleButton} from "../Components/Buttons/Toggle";
import React from "react";
import {withRouter} from "react-router-dom";

const NavIcons = (props) => {
    return (
        <div className={'side_nav'}>
            <OpenHiveNav icon={openHiveIcon}/>
            <NavItem path={'/blog'} name={'Blog'} icon={openHiveIcon}/>
            <NavItem path={'/profile'} name={'Profile'} icon={profileIcon}
            />
            {/*<NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}*/}
            {/*path={'slots'} name={'Slots'} icon={slotsIcon}/>*/}
            <NavItem path={'/boards'} name={'Boards'} icon={openHiveIcon}/>
            {/*<NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}*/}
            {/*path={'notifications'} name={'Notifications'} icon={notificationIcon}/>*/}
            <NavItem path={props.location.pathname} name={'Messages'} icon={messageIcon}/>
            {/*<NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}*/}
            {/*path={'coalition'} name={'Coalition'} icon={coalitionIcon}/>*/}
            <NavItem path={props.location.pathname} name={'Search'} icon={searchIcon}/>
            {/*<ToggleButton connected={props.intra} setConnected={props.setIntra}/>*/}
        </div>
    )
};

export default withRouter(NavIcons)
