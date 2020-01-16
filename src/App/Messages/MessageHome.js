import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {useNav} from "../Hooks/Hooks";

import './messages.css'
import {makeRequest} from "../Api/Api";
import {getLocal} from "../../utils/utils";

const MessageHome = (props) => {

    let profile = JSON.parse(localStorage.getItem("currentUser"));
    const [threads, setThreads] = useState([]);
    const [inputVal, setInputVal] = useState('');
    useNav('message_home', props.setCurrentNav);

    const getThreads = async () => {
        let resp = await makeRequest('messages/threads');
        setThreads(resp.data);
    };

    const createThread = async () => {
        let resp = await makeRequest('messages/threads/create_thread', 'post', {
            threadName: inputVal
        });
        setThreads([...threads, resp.data]);
    };

    useEffect(() => {
        getThreads();
    }, []);

    const renderFriends = () => {
        return (
            threads.map((thread) => {
                return (
                    <div  className={'row message_friend_item'} key={thread.thread_id}>
                        <Link to={'/messages/' + thread.thread_id}>{thread.thread_name}</Link>

                    </div>
                )
            })
        )
    };

    return (
        <div className={'message_friend_list'}>
            <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder={'thread name'}/><button onClick={createThread}>Create thread</button>
            {renderFriends()}
        </div>
    )
};

export default MessageHome