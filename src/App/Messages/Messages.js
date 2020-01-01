import React from 'react';
import {useFetch, useNav} from "../Hooks/Hooks";

const Messages = (props) => {

    useNav('messages', props.setCurrentNav);

    return (
        <div>
            Messages Page
        </div>
    )
};

export default Messages