import React, { useState, useEffect } from 'react'
import ProfilePage from './ProfilePage'
import { makeRequest } from '../Api/Api'
import './profile.css'

const Profile = (props) => {

    const [profile, setProfile] = useState({});

    const getProfile = async () => {
        props.setCurrentNav('profile'); // if page is refreshed, set nav to profile
        if (localStorage.getItem('token')) {
            let resp = await makeRequest(`profiles/${JSON.parse(window.localStorage.getItem('token')).id}`, 'get', {});
            setProfile(resp.data); // make request to profiles endpoint and get current user by id
        }
        else {
            props.history.push('login') // if user not found, redirect to login page
        }
    };
    useEffect(() => {
        getProfile() // eslint-disable-next-line
    }, []);

    return (
        <ProfilePage profile={profile}/>
    );
};


export default Profile