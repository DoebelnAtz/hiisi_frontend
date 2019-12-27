import {Link} from "react-router-dom";
import React from "react";
import '../nav.css'

export const NavSlots = (props) => {

    const setNavSlots = () => {
        props.stuff.currentNav('profile / slots')
    };
    return (
        <Link
            to={'/profile/slots'}
            className={`row nav_item sub_item ${props.stuff.nav === 'profile / slots' ? 'active' : 'inactive'}`}
            onClick={setNavSlots}
        >
            <i className="fas fa-user"> </i><span
            id={'profile_nav'}
            className={`d-none d-md-block`}>
            Slots</span>
        </Link>
    )

};