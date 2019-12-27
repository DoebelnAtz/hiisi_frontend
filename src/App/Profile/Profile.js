import React, { useState, useEffect } from 'react'
import ProfilePage from './ProfilePage'
import { makeRequest } from '../Api/Api'
import './profile.css'

const Profile = (props) => {

    const [profile, setProfile] = useState({});

    const getProfile = async () => {
        if (localStorage.getItem('token')) {
            let resp = await makeRequest(`profiles/${JSON.parse(window.localStorage.getItem('token')).id}`, 'get', {});
            setProfile(resp.data);
        }
        else {
            props.history.push('login')
        }
    };

    useEffect(() => {
        getProfile()
    }, []);

    return (
        <ProfilePage profile={profile}/>
    );
};


export default Profile