import React, { useEffect, useState, useRef } from 'react';
//import ReconnectingWebSocket from 'reconnecting-websocket';
import { useParams } from "react-router-dom";
import _ from 'lodash'

import { useNav } from "../Hooks/Hooks";
import Button from "../Components/Buttons/Button";
import { makeRequest } from "../Api/Api";
import './messages.css'
import {calculateTimeSince} from "../../utils/utils";

import socketIOClient from "socket.io-client";

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            inputVal: ''
        };
        this.scrollDown = React.createRef();
    }

    profile = JSON.parse(localStorage.getItem("currentUser"));

    getMessages = async () => {
        let resp = await makeRequest('messages/threads/' + this.props.match.params.tid, 'GET',);
        this.setState({messages: resp.data});
        console.log(this.state.messages);
    };

    socket;

    componentDidMount() {
        this.socket = socketIOClient('http://localhost:5000');
        this.getMessages();
        this.connectToRoom();
    }

    appendMessages = (message) => {
        console.log(this.state.messages);
        this.setState({messages: [...this.state.messages, message]});

    };

    connectToRoom = () => {
        console.log(this.state.messages);
        this.socket.on('chat-message', (message) => {
            this.appendMessages(message);
        });
    };

    handleClick = async (event) => {
        event.preventDefault();
        if (this.socket) {
            var final_data = {
                'message': this.state.inputVal,
            };
            this.socket.emit('send-message', {
                message: this.state.inputVal,
                username: this.profile.username,
                time_sent: new Date().toISOString(),
                m_id: 2});
        }
        this.setState({ inputVal: ''});
    };

    handleEnter = (event) => {
        if (event.key === "Enter") {
            this.handleClick(event);
        }
    };

    renderMessages = () => {
        return (
            this.state.messages.map((message) => {
                return (
                    <div key={message.m_id} className={(message.username === this.profile.username) ? "sent" : "received"}>
                        <div className={'container-fluid'}>
                        <div className={'row message_info'}>
                            <img className={'message_img'} src={"https://cdn.intra.42.fr/users/small_" + message.username + ".jpg"}/>
                            <span className={'message_info_time'}>{calculateTimeSince(message.time_sent)}</span>
                        </div>
                        <div className={'row message_content'}>
                            <span className={"message_text"}>{message.message}</span>
                        </div>
                        </div>
                    </div>
                )
            })
        )
    };
    render() {
        console.log('rendered');
        return (
            <div>
                <div className={'message_cont container'}>
                    <div className={"message_feed"}>
                        {this.renderMessages()}
                        <div ref={this.scrollDown}></div>
                    </div>
                    <div className={''}>
                    <textarea onKeyDown={(e) =>this.handleEnter(e)} value={this.state.inputVal}
                              onChange={(e) => this.setState({inputVal: e.target.value})}>
                    </textarea>
                        <Button onClick={(e) => this.handleClick(e)} text={'SEND'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Messages