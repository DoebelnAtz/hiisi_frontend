import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";


import '../../Messages/messages.css'
import {makeRequest} from "../../Api/Api";


const MessageHome = (props) => {
    const [threads, setThreads] = useState([]);
    const [inputVal, setInputVal] = useState('');

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
                    <div  className={'row message_thread_item'} key={thread.thread_id}>
                        <Link to={'/messages/' + thread.thread_id}>{thread.thread_name}</Link>

                    </div>
                )
            })
        )
    };

    return (
        <div className={'message_thread_list'}>
            <div className={'add_thread_input'}>
                <input  value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder={'thread name'}/><button onClick={createThread}>Create thread</button>
            </div>
                {renderFriends()}
        </div>
    )
};

export default MessageHome