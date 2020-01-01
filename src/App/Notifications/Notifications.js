import React from 'react';
import {useFetch, useNav} from "../Hooks/Hooks";

const Notifications = (props) => {

    useNav('notifications', props.setCurrentNav);

    return (
        <div>
            Notifications page
        </div>
    )
};

export default Notifications