import coalitionIcon from './navIcons/Shield.png'
import searchIcon from './navIcons/Search.png'
import messageIcon from './navIcons/Messages.png'
import notificationIcon from './navIcons/Notifications.png'
import homeIcon from './navIcons/Home.png'
import slotsIcon from './navIcons/Slots.png'
import logo from './navIcons/Logo.png'
import {Logo, NavItem, OpenHiveNav, Profile} from "./NavItems";
import {ToggleButton} from "../Components/Buttons/Toggle";
import React from "react";

export default (props) => {
    return (
        <div className={'side_nav'}>
            <OpenHiveNav currentNav={props.currentNav} icon={homeIcon} setCurrentNav={props.setCurrentNav}
                         hoveredNav={props.hoveredNav} setHoveredNav={props.setHoveredNav}
            />
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     hoveredNav={props.hoveredNav} setHoveredNav={props.setHoveredNav}
                     path={'blog'} name={'Blog'} icon={homeIcon}/>
            <Profile currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     hoveredNav={props.hoveredNav} setHoveredNav={props.setHoveredNav}
            />
            {/*<NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}*/}
            {/*path={'slots'} name={'Slots'} icon={slotsIcon}/>*/}
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     hoveredNav={props.hoveredNav} setHoveredNav={props.setHoveredNav}
                     path={'boards'} name={'Boards'} icon={slotsIcon}/>
            {/*<NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}*/}
            {/*path={'notifications'} name={'Notifications'} icon={notificationIcon}/>*/}
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     hoveredNav={props.hoveredNav} setHoveredNav={props.setHoveredNav}
                     path={'message_home'} name={'Messages'} icon={messageIcon}/>
            {/*<NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}*/}
            {/*path={'coalition'} name={'Coalition'} icon={coalitionIcon}/>*/}
            <NavItem currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}
                     hoveredNav={props.hoveredNav} setHoveredNav={props.setHoveredNav}
                     path={'search'} name={'Search'} icon={searchIcon}/>
            <ToggleButton connected={props.intra} setConnected={props.setIntra}/>
        </div>
    )
}

