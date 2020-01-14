import React, { useState, useEffect, useRef } from 'react'

import ProfilePage from './ProfilePage'
import { makeRequest } from '../Api/Api'
import './profile.css'
import {getLocal} from "../../utils/utils";


const Profile = (props) => {

    const [profile, setProfile] = useState({});

    const isMounted = useRef(true);

    const getProfile = async () => {
        props.setCurrentNav('profile'); // if page is refreshed, set nav to profile

        let resp = await makeRequest(`users/${getLocal('token').user.u_id}`, 'get', {});
        if (isMounted.current)
            setProfile(resp.data); // make request to profiles endpoint and get current user by id

        else {
            props.history.push('login') // if user not found, redirect to login page
        }
    };

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    });

    useEffect(() => {
        getProfile() // eslint-disable-next-line
    }, []);
    return (
        <ProfilePage profile={profile}/>
    );
};


export default Profile