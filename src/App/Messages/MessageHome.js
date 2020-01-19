import React, {useEffect, useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import {useNav} from "../Hooks/Hooks";

import './messages.css'
import {makeRequest} from "../Api/Api";
import {getLocal} from "../../utils/utils";
import Messages from "./Messages";

const MessageHome = (props) => {

    let profile = JSON.parse(localStorage.getItem("currentUser"));
    const [inputVal, setInputVal] = useState('');
    const [thread, setThread] = useState({});
    useNav('messages', props.setCurrentNav);

    const createThread = async () => {

        let resp = await makeRequest('messages/threads/create_thread', 'post', {
            threadName: inputVal
        });

        if (resp.data) {
            props.history.push('messages/' + resp.data.thread_id);
        }
    };

    const getThreads = async () => {
        let resp = await makeRequest('messages/threads');
        if (resp.data) {
            setThread(resp.data[0]);
        }
        return (<div> </div>)
    };

    useEffect(() => {getThreads()}, []);

    return (
        <div className={'message_friend_list'}>
            <div>No threads, create one!</div>
        </div>
    )
};

export default withRouter(MessageHome)
