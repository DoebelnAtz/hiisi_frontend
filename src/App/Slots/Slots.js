import React, { useState } from 'react';
import { createMuiTheme } from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { ThemeProvider } from "@material-ui/styles";
import {
    DateTimePicker,

} from '@material-ui/pickers';
import moment from 'moment'

import { useNav } from "../Hooks/Hooks";

const Slots = (props) => {

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
