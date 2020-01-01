import React, {useEffect} from 'react';
import {useFetch, useNav} from "../Hooks/Hooks";

import DatePicker from '../Components/DatePicker/DatePicker'

const Slots = (props) => {

    useNav('slots', props.setCurrentNav);

    return (
        <div>
            <DatePicker/>
        </div>
    );
};

export default Slots;
