import React, { useState, useEffect } from 'react'
import connect from "react-redux/es/connect/connect";
import {currentNav} from "../../actions";
import ProfilePage from './ProfilePage'
import { makeRequest } from '../Api/Api'
import './profile.css'

const Profile = (props) => {

    const [profile, setProfile] = useState({});

    const getProfile = async () => {
        if (localStorage.getItem('token')) {
            let resp = await makeRequest(`profiles/${JSON.parse(window.localStorage.getItem('token')).id}`, 'get', {});
            setProfile(resp.data);
            props.currentNav('profile');
        }
        else{
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

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        nav: state.nav
    };
};

export default connect(mapStateToProps, { currentNav})(Profile)