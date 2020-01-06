import React, {useEffect, useState, useRef} from 'react';
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

    const pickTime = useRef();
    useNav('slots', props.setCurrentNav);
    const [selectedDate, setSelectedDate] = useState(moment());
    console.log(selectedDate);
    return (
        <div>
            <div className={'slots_datetimepicker'}>
            <DateTimePicker
                inputVariant="outlined"
                ampm={false}
                disablePast
                value={selectedDate}
                onChange={setSelectedDate}/>
            </div>

        </div>
    );
};

export default Slots;
