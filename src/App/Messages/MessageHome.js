import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {useNav} from "../Hooks/Hooks";

import './messages.css'
import {makeRequest} from "../Api/Api";
import {getLocal} from "../../utils/utils";

const MessageHome = (props) => {

    let profile = JSON.parse(localStorage.getItem("currentUser"));
    const [threads, setThreads] = useState([]);
    useNav('message_home', props.setCurrentNav);

    const getThreads = async () => {
        let resp = await makeRequest('messages/users/' + getLocal('token').user.u_id)
        setThreads(resp.data);
    };

    useEffect(() => {
        getThreads();
    }, []);


    const renderFriends = () => {
        return (
            threads.map((thread) => {
                return (
                    <div  className={'row message_friend_item'} key={thread.thread_id}>
                        <Link to={'/messages/' + thread.thread_id}>Thread</Link>
                        <span>{thread.thread_id}</span>
                    </div>
                )
            })
        )
    };
    return (
        <div className={'message_friend_list'}>
            {renderFriends()}
        </div>
    )
};

export default MessageHome