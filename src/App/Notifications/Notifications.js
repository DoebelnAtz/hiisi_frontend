import React, {useState} from 'react';
import {useFetch, useNav} from "../../Hooks";
import Button from "../Components/Buttons/Button";
import {makeRequest} from "../Api/Api";
import _ from 'lodash'

const Notifications = (props) => {

    useNav('notifications', props.setCurrentNav);

    let profile = JSON.parse(localStorage.getItem("currentUser"));

    return (
        <div>
            Notifications page
        </div>
    )
};

export default Notifications