import React, {useEffect, useState, useRef} from 'react';
import { createMuiTheme } from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/lightBlue";
import cyan from "@material-ui/core/colors/cyan";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from '@date-io/moment'; // choose your lib
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment'

import {useFetch, useNav} from "../Hooks/Hooks";

const Slots = (props) => {

    const pickTime = useRef();
    useNav('slots', props.setCurrentNav);

    const customMaterialTheme = createMuiTheme({
        palette: {
            primary: lightBlue,
        },
    });

    const [selectedDate, setSelectedDate] = useState(moment());
    return (
        <div className={'slots_datetimepicker'}>
        <ThemeProvider theme={customMaterialTheme}>
            <DateTimePicker
                inputVariant="outlined"
                ampm={false}
                minutesStep={15}
                disablePast
                value={selectedDate}
                onChange={setSelectedDate}
            />
        </ThemeProvider>
        </div>
    );
};

export default Slots;
