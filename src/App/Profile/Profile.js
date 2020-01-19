import React, {useState, useEffect, useRef, useContext} from 'react'

import ProfilePage from './ProfilePage'
import { makeRequest } from '../Api/Api'
import './profile.css'
import {getLocal} from "../../utils/utils";
import CurrentNavContext from "../../Context/CurrentNavContext";


const Profile = () => {

    const [profile, setProfile] = useState({});

    const isMounted = useRef(true);
    const {setCurrentNav} = useContext(CurrentNavContext);

    const getProfile = async () => {
        setCurrentNav('profile'); // if page is refreshed, set nav to profile

        let resp = await makeRequest(`users/${getLocal('token').user.u_id}`, 'get', {});

        if (isMounted.current)
            setProfile(resp.data); // make request to profiles endpoint and get current user by id
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