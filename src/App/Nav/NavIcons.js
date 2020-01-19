import coalitionIcon from './navIcons/Shield.png'
import searchIcon from './navIcons/Search.png'
import messageIcon from './navIcons/Messages.png'
import notificationIcon from './navIcons/Notifications.png'
import homeIcon from './navIcons/Home.png'
import slotsIcon from './navIcons/Slots.png'
import profileIcon from './navIcons/Profile1.png'

import { NavItem, OpenHiveNav } from "./NavItems";
import {ToggleButton} from "../Components/Buttons/Toggle";
import React from "react";

export default (props) => {
    return (
        <div className={'side_nav'}>
            <OpenHiveNav icon={homeIcon}/>
            <NavItem path={'blog'} name={'Blog'} icon={homeIcon}/>
            <NavItem path={'profile'} name={'Profile'} icon={profileIcon}
            />
            {/*<NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}*/}
            {/*path={'slots'} name={'Slots'} icon={slotsIcon}/>*/}
            <NavItem path={'boards'} name={'Boards'} icon={slotsIcon}/>
            {/*<NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}*/}
            {/*path={'notifications'} name={'Notifications'} icon={notificationIcon}/>*/}
            <NavItem path={'message_home'} name={'Messages'} icon={messageIcon}/>
            {/*<NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}*/}
            {/*path={'coalition'} name={'Coalition'} icon={coalitionIcon}/>*/}
            <NavItem path={'search'} name={'Search'} icon={searchIcon}/>
            {/*<ToggleButton connected={props.intra} setConnected={props.setIntra}/>*/}
        </div>
    )
}

