import React from 'react';

import { NavSlots } from './ProfileOptionsNav'

const ProfileOptions = (props) => {

    return (
        <div>
            <NavSlots currentNav={props.currentNav} setCurrentNav={props.setCurrentNav}/>
        </div>
    );
};

export default ProfileOptions;
