import React, {useEffect} from 'react';

import DatePicker from '../Components/DatePicker/DatePicker'

const Slots = (props) => {

    useEffect(() => {
        props.setCurrentNav('slots') // eslint-disable-next-line
    }, []);

    return (
        <div>
            <DatePicker/>
        </div>
    );
};

export default Slots;
