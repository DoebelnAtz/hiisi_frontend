import React, {useEffect} from 'react';
import {useFetch, useNav} from "../Hooks/Hooks";

import DatePicker from '../Components/DatePicker/DatePicker'
import SlotSchedule from './SlotSchedule'
const Slots = (props) => {

    useNav('slots', props.setCurrentNav);

    return (
        <div>
            <DatePicker/>
            <SlotSchedule/>
        </div>
    );
};

export default Slots;
