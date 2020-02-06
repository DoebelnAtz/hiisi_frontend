import React, {useState} from 'react';
import {useFetch, useNav, useRequest} from "../../Hooks/Hooks";

import './coalition.css'

const Coalition = (props) => {

    const [coalition, setCoalition] = useState({});

    useRequest('coalitions/1', 'get', {}, setCoalition);

    useNav('coalition', props.setCurrentNav);

    return (
        <div>
            <p>Coalition Page</p>
            <p>Coalition name: {coalition.name}</p>
            <p>Coalition rank: {coalition.rank}</p>
            <p>Coalition points: {coalition.points}</p>
            <p>Achievement points: {coalition.achievement_points}</p>
            <img className={'coalition_image'} src={coalition.img_url} alt={coalition.name}/>

        </div>
    )
};

export default Coalition