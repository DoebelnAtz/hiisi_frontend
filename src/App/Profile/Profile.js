import React from 'react'

import ProfilePage from './ProfilePage'
import './profile.css'
import {withRouter} from "react-router-dom";
import {useNav, useRequest} from "../../Hooks/Hooks";


const Profile = () => {

    useNav('profile'); // if page is refreshed, set nav to profile

    const [profile] = useRequest(`users/me`, 'get');

    return (
        <ProfilePage profile={profile}/>
    );
};


export default withRouter(Profile);