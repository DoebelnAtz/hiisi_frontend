import React from 'react'
import { withRouter } from 'react-router-dom'
import './base.css'

const Header = (props) => {

    const requestLogout = () => {
        localStorage.clear();
        props.history.push('/login')
    };

    return (
        <div className={'row header_nav'}>
            <div id={'header_nav_title'}>currentNav</div>
            <div id={'header_logout'}
                onClick={requestLogout}
            >Logout</div>
        </div>
    );
};

export default withRouter(Header)