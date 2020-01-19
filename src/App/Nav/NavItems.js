import React, {useContext} from "react";
import { Link } from 'react-router-dom'
import './nav.css'

import profileIcon from './navIcons/Profile1.png'
import Button from '../Components/Buttons/Button'
import CurrentNavContext from '../../Context/CurrentNavContext'
import HoveredNavContext from '../../Context/HoveredNavContext'

export const Logo = (props) => {
    const setNavHome = () => {
        props.setCurrentNav('Open Hive')
    };
    return (
        <Link
            to={'/blog'}
            className={'row nav_item nav_logo'}
            onClick={setNavHome}
        >
            <img className={"nav_icon"} src={props.icon} alt={'blog_icon'}/><span
            id={'home_nav'}
            className={'nav_item_text'}>
            Hivemind</span>
        </Link>
    )
};


export const OpenHiveNav = (props) => {
    const { currentNav, setCurrentNav} = useContext(CurrentNavContext);
    const { hoveredNav, setHoveredNav } = useContext(HoveredNavContext);
    return (
        <Link
            onMouseOver={() => setHoveredNav('Open Hive')}
            to={`/openhive`}
            className={`row nav_item ${hoveredNav === 'Open Hive'
                ? 'hovered' : hoveredNav === "Open Hive" ? 'hovered' : currentNav === "Open Hive" ? 'active' : 'inactive'}`}
            onClick={() => setCurrentNav("Open Hive")}
        >
            <img className={'nav_icon'} src={props.icon} alt={'OpenHive_icon'}/>
        </Link>
    )
};

export const NavItem = (props) => {
    const { currentNav, setCurrentNav} = useContext(CurrentNavContext);
    const { hoveredNav, setHoveredNav } = useContext(HoveredNavContext);

    return (
        <Link
            onMouseOver={() => setHoveredNav(props.name.toLowerCase())}
            onMouseLeave={() => setHoveredNav('')}
            to={`/${props.path}`}
            className={`row nav_item ${hoveredNav === props.name.toLowerCase()
                ? 'hovered' : currentNav === props.name.toLowerCase()
                    ? 'active' : 'inactive'}`}
            onClick={() => setCurrentNav(props.name.toLowerCase())}
        >
            <img className={'nav_icon'} src={props.icon}  alt={`${props.name}_icon`}/>
        </Link>
    )
};

export const ConnectToIntra = (props) => {

      return (
          <a
          >
          <Button disabled={props.disabled}
                  onClick={() => props.setConnectedText('Connecting...')}
                  text={props.text}
          >
          </Button>
          </a>
      )
};




