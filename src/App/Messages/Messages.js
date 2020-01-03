import React, { useEffect, useState } from 'react';
import { useFetch, useNav } from "../Hooks/Hooks";
import ReconnectingWebSocket from 'reconnecting-websocket';
import TextArea from "../Components/TextArea";
import Button from "../Components/Buttons/Button";
import { useParams } from "react-router-dom";
import {makeRequest} from "../Api/Api";
import _ from 'lodash'

import './messages.css'

const getSocket = (u) => {
    return new WebSocket(u)
};
const memoizedSocket = _.memoize(getSocket);

const Messages = (props) => {

    useNav('messages', props.setCurrentNav);

    const [messages, setMessages] = useState([]);
    const [inputVal, setInputVal] = useState('');
    let profile = JSON.parse(localStorage.getItem("currentUser"));
    let { user } = useParams();
    var url = 'ws://134.209.227.11/messages/' + user + '/?user=' + profile.username;

    var socket = memoizedSocket(url);

    const getMessages = async () => {
        let data = {
            username: profile.username,
            other_user: user
        };
        let resp = await makeRequest('message_thread/', 'POST',data,{
            "Content-Type": "application/json"
        });
        if (resp.data)
            setMessages(resp.data.messages);
    };


    useEffect(() => {
        getMessages()
    }, []);

    if (socket) {
        socket.onmessage = function (event) {
            console.log("message", event);
            var data = JSON.parse(event.data);
            setMessages([...messages, data]);
        };
        socket.onopen = function (event) {
            console.log("open", event);
        };

        socket.onclose = function (event) {
            console.log("close", event)
        };

        socket.onerror = function (event) {
            console.log("error", event)
        };
    }

    const handleClick = async (event) => {
        event.preventDefault();
        if (socket) {
            var final_data = {
                'message': inputVal,
            };
            await socket.send(JSON.stringify(final_data));

        }
        setInputVal('');
    };

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            handleClick(event);
        }
    };

    const renderMessages = () => {
        return (
            messages.map((message) => {
                return (
                    <div key={message.timestamp} className={(message.sender === profile.username) ? "sent" : "received"}>
                        <img style={{height: "30px", marginRight: "5px"}} src={"https://cdn.intra.42.fr/users/small_" + message.sender + ".jpg"}/><span className={"message_text"}>{message.text}</span>
                    </div>
                )
            })
        )
    };

    return (
        <div>
            <div className={'message_cont container'}>
                <div className={"message_feed"}>
                    {renderMessages()}
                </div>
                <textarea onKeyDown={(e) => handleEnter(e)} value={inputVal} onChange={(e) => setInputVal(e.target.value)}>
                </textarea>
                <Button onClick={(e) => handleClick(e)} text={'SEND'}/>
            </div>
        </div>
    )
};

export default Messages