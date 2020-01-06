import React, {useEffect, useState} from 'react';
import {useFetch, useNav} from "../Hooks/Hooks";
import DateFnsUtils from '@date-io/moment'; // choose your lib
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment'
import SlotSchedule from './SlotSchedule'

const Slots = (props) => {

    useNav('slots', props.setCurrentNav);
    const [selectedDate, setSelectedDate] = useState(moment());
    console.log(selectedDate._d.toISOString());
    return (
        <div>
            <DateTimePicker value={selectedDate} onChange={setSelectedDate}/>

        </div>
    );
};

export default Slots;
