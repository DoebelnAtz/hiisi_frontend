import React, { useEffect, useState } from 'react';
import {Link, withRouter} from "react-router-dom";


import './message_nav.css'
import {makeRequest} from "../../Api/Api";
import Button from "../../Components/Buttons/Button";
import Input from "../../Components/Input";


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
        setInputVal('');
    };

    useEffect(() => {
        getThreads();
    }, []);

    const renderFriends = () => {
        return (
            threads.map((thread) => {
                return (
                    <div
                        className={'row message_thread_item'}
                        key={thread.thread_id}
                        onClick={() => props.history.push('/messages/'  + thread.thread_id)}>
                        <span>{thread.thread_name}</span>
                    </div>
                )
            })
        )
    };

    return (
        <div className={'message_thread_list'}>
            <div className={'row_div'}>
                <Input
                    valueState={inputVal}
                    onEnter={createThread}
                    setValueState={setInputVal}
                    placeholder={'thread name'}
                    customStyle={{
                        width: '143px',
                        marginTop: 'var(--viewMargin)',
                        marginLeft: 'var(--viewMargin)',
                        borderTopRightRadius: '0',
                        borderBottomRightRadius: '0',
                        borderRight: '0'
                    }}
                />
                <Button
                    customStyle={{
                        marginTop: 'var(--viewMargin)',
                        borderRadius: '0 2px 2px 0'}}
                    onClick={createThread}
                >
                    Create
                </Button>
            </div>
                {renderFriends()}
        </div>
    )
};

export default withRouter(MessageHome)