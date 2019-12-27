import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

import { NavSlots } from './ProfileOptionsNav'

const ProfileOptions = (props) => {

    return (
        <div>
            <NavSlots currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}/>
        </div>
    );
};

export default ProfileOptions;
