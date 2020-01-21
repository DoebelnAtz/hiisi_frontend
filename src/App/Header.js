import React, {useContext} from 'react'
import { withRouter } from 'react-router-dom'
import './base.css'
import {Logo} from "./Nav/NavItems";
import logo from "./Nav/navIcons/Logo6.png";
import CurrentNavContext from "../Context/CurrentNavContext";

const Header = (props) => {

    const requestLogout = () => {
        localStorage.clear();
        props.history.push('/login')
    };
    const { currentNav, setCurrentNav} = useContext(CurrentNavContext);

    return (
        <div className={'d-flex header_nav'}>
            <div className={'logo_section'}>
                <Logo
                    currentNav={currentNav}
                    icon={logo}
                    setCurrentNav={setCurrentNav}
                />
            </div>
            <div id={'header_nav_title'}>
                {props.currentNav}
                </div>
            <div className={'ml-auto'} id={'header_logout'}
                onClick={requestLogout}
            >Logout</div>
        </div>
    );
};

export default withRouter(Header)